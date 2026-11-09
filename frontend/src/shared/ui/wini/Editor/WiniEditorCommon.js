import { winiDate } from '@/shared/lib';
import { Communicator, getTenantUrl, OpenCommunicator } from "@/shared/api";
import { winiMsg } from '@/shared/model';
import debounce from "debounce";

const preparingImgPlaceholder = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
const base64ImgMagicTag = 'Img0MetaData';

// 새로운 파일이 올라올때만 캐시 정리 프로세스 시작하고, 최소 10분이 지나야 캐시 정리 동작함 
const CACHE_CLEAN_UP_INTERVAL_IN_MS = 1000 * 60 * 10;   // 10분마다 캐시 정리 
const CACHE_LIFETIME_IN_MS = 1000 * 60 * 60 * 24 * 2;   // 2일마다 캐시 삭제 (캐시일자 기준)
const CACHE_USE_LIFETIME_IN_MS = 1000 * 60 * 60 * 1;    // 최근 사용이 1시간 이상된 캐시 삭제

let _signedFileIdCache = {};
let lastSignedFileIdCacheCleanUpTime = Date.now();

const clearSignedFileIdCache = () => {
  _signedFileIdCache = {};
}

window.clearSignedFileIdCache = clearSignedFileIdCache;
window._signedFileIdCache = _signedFileIdCache;

// markdown 모드의 preview 탭에서 사용됨
const customHtmlImageRenderer = (node, context) => {
  let imgSrc = node.destination || '';
  const rawUrl = imgSrc;
  let preparedFileId = null;
  let imgServiceName = null;
  let isLoading = false;
  let isError = false;

  if (imgSrc.startsWith('@')) {
    [imgServiceName, preparedFileId] = imgSrc.substring(1).split('@');

    if (preparedFileId) {
      imgSrc = prepareSignedImage(imgServiceName, preparedFileId);

      isLoading = imgSrc.startsWith(preparingImgPlaceholder.substring(0, 10));
      isError = getCacheState(imgServiceName, preparedFileId) === 'ERROR';
    }
  } else {
    imgSrc = imgSrc.replace(/@.*/g, '');
  }

  let html;
  let style = '';

  if (rawUrl) {
    const urlParts = rawUrl.split('@');

    if (urlParts.length > 1) {
      urlParts.forEach((part) => {
        const matches = part.match(/(w|h)=([0-9]+)/);

        if (matches && matches.length > 2) {
          if (part.startsWith('w=')) {
            style += 'width: ' + matches[2] + 'px;';
          } else if (part.startsWith('h=')) {
            style += 'height: ' + matches[2] + 'px;';
          }
        }
      });
    }
  }

  if (context.entering) {
    html = `<img src="${imgSrc}"`;

    if (style) {
      html += ` style="${style}"`;
    }

    if (preparedFileId) {
      html += ` data-prepared-service-name="${imgServiceName}" data-prepared-file-id="${preparedFileId}" class="wini-editor-inline-image ${isLoading ? 'wini-editor-inline-image--loading' : ''} ${isError ? 'wini-editor-inline-image--error' : ''}"`;
    }
    html += ' alt="';
  } else {
    html = `'"/>`
    html += `<span class="wini-editor-inline-image-placeholder" data-prepared-service-name="${imgServiceName}" data-prepared-file-id="${preparedFileId}">`;
    html += `    <span class="wini-editor-inline-image-placeholder__icon"></span>`;
    html += `</span>`;
  }

  return {
    type: 'html',
    content: html,
  };
}

const getCacheKey = (serviceName, fileId) => {
  return serviceName + '_' + fileId;
}

const getCacheState = (serviceName, fileId) => {
  const cacheKey = getCacheKey(serviceName, fileId);

  if (_signedFileIdCache[cacheKey]) {
    return _signedFileIdCache[cacheKey].state;
  }

  return 'UNKNOWN';
}

const prepareSignedImage = (serviceName, fileId) => {
  let cacheKey = getCacheKey(serviceName, fileId);

  if (!_signedFileIdCache[cacheKey]) {
    _signedFileIdCache[cacheKey] = {
      state: 'PENDING', // PENDING, PREPARING, DONE, ERROR
      serviceName: serviceName,
      fileId: fileId,
      signedFileId: null,
      cachedAt: null,
      lastUsedAt: null
    }

    _prepareSignedImage();
  } else if (_signedFileIdCache[cacheKey].state === 'DONE') {
    let signedFileIdCacheData = _signedFileIdCache[cacheKey];

    signedFileIdCacheData.lastUsedAt = Date.now();

    setTimeout(() => {
      document.querySelectorAll(`.wini-editor-inline-image[data-prepared-service-name="${serviceName}"][data-prepared-file-id="${fileId}"]`).forEach((elem) => {
        elem.onerror = function () {
          this.classList.remove('wini-editor-inline-image--loading');
          this.classList.add('wini-editor-inline-image--error');
        }
      });
    }, 0);

    return `${getTenantUrl()}/api/v1/${serviceName}/commonFile/preview/${signedFileIdCacheData.signedFileId}`;
  } else if (_signedFileIdCache[cacheKey].state === 'ERROR') {
    _prepareSignedImage(serviceName, [fileId], 'ERROR');
  }

  if (lastSignedFileIdCacheCleanUpTime + CACHE_CLEAN_UP_INTERVAL_IN_MS < Date.now()) {
    // 10분 마다 이미지 캐시 정리
    cleanUpSignedFileIdCache()
    lastSignedFileIdCacheCleanUpTime = Date.now();
  }

  return preparingImgPlaceholder.replace(/=/g, 'A') + base64ImgMagicTag + btoa('@' + serviceName + '@' + fileId);
};

const cleanUpSignedFileIdCache = () => {
  Object.keys(_signedFileIdCache).forEach((key) => {
    if (_signedFileIdCache[key].cachedAt && (Date.now() - _signedFileIdCache[key].cachedAt) >= CACHE_LIFETIME_IN_MS) {
      delete (_signedFileIdCache[key]);
    } else if (_signedFileIdCache[key].lastUsedAt && (Date.now() - _signedFileIdCache[key].lastUsedAt >= CACHE_USE_LIFETIME_IN_MS)) {
      delete (_signedFileIdCache[key]);
    }
  });
}

/**
 * @param {string} targetServiceName 대상 서비스. undefined나 null일 경우 모든 서비스 대상
 * @param {string} targetFileIdList 대상 파일 ID 리스트. undefined나 null일 경우 모든 파일 대상
 * @param {string} targetState 대상 상태. undefined나 null일 경우 모든 상태 대상
 * @type {debounce.DebouncedFunction<(function(*, *, *): Promise<void>)|*>}
 * @private
 */
const _prepareSignedImage = debounce(async (targetServiceName, targetFileIdList, targetState) => {
  const pendingFileIdListByServiceMap = {};

  Object.keys(_signedFileIdCache).forEach((key) => {
    const fileIdCache = _signedFileIdCache[key];

    if (targetState && fileIdCache.state !== targetState) {
      return;
    }

    if (targetServiceName && fileIdCache.serviceName !== targetServiceName) {
      return;
    }

    if (targetFileIdList && !targetFileIdList.includes(fileIdCache.fileId)) {
      return;
    }

    if (fileIdCache.state === 'PENDING') {
      if (!pendingFileIdListByServiceMap.hasOwnProperty(fileIdCache.serviceName)) {
        pendingFileIdListByServiceMap[fileIdCache.serviceName] = [];
      }

      pendingFileIdListByServiceMap[fileIdCache.serviceName].push(fileIdCache.fileId);
    } else if (fileIdCache.state === 'ERROR' && targetState === 'ERROR') {
      // 오류의 경우는 명시적으로 오류인것을 불러오라 할때만 불러오기
      if (!pendingFileIdListByServiceMap.hasOwnProperty(fileIdCache.serviceName)) {
        pendingFileIdListByServiceMap[fileIdCache.serviceName] = [];
      }

      pendingFileIdListByServiceMap[fileIdCache.serviceName].push(fileIdCache.fileId);
    }
  });

  Object.keys(pendingFileIdListByServiceMap).forEach((serviceName) => {
    const communicator = new Communicator();
    const fileIdList = pendingFileIdListByServiceMap[serviceName];

    const requestedFileIdMap = {};

    fileIdList.forEach((fileId) => {
      requestedFileIdMap[fileId] = true;
    });

    communicator.client.post(`/api/v1/${serviceName}/commonFile/preparePreview/`, {
      fileIdList: fileIdList
    }).then((response) => {
      if (response.data && response.data.data && response.data.data.preparedPreviewList) {
        const fileIdList = [];

        response.data.data.preparedPreviewList.forEach((preparedPreview) => {
          const signedFileId = preparedPreview.signedFileId;
          const fileId = preparedPreview.fileId;
          const cacheKey = getCacheKey(serviceName, fileId);

          // 이미지 정보가 있는 경우 요청된 ID 목록에서 삭제
          delete (requestedFileIdMap[fileId]);

          if (_signedFileIdCache[cacheKey]) {
            _signedFileIdCache[cacheKey].state = 'DONE';
            _signedFileIdCache[cacheKey].signedFileId = signedFileId;
            _signedFileIdCache[cacheKey].cachedAt = Date.now();

            fileIdList.push(fileId);
          }
        });

        Object.keys(requestedFileIdMap).forEach((fileId) => {
          // 이미지 정보가 없는 경우 에러로 간주
          const cacheKey = getCacheKey(serviceName, fileId);
          if (_signedFileIdCache[cacheKey]) {
            _signedFileIdCache[cacheKey].state = 'ERROR';
          }

          document.querySelectorAll(`.wini-editor-inline-image[data-prepared-service-name="${serviceName}"][data-prepared-file-id="${fileId}"]`).forEach((elem) => {
            elem.classList.remove('wini-editor-inline-image--loading');
            elem.classList.add('wini-editor-inline-image--error');
          });
        });

        _applyPreparedSignedImage(serviceName, fileIdList);
      }
    }).catch((error) => {
      pendingFileIdListByServiceMap[serviceName].forEach((fileId) => {
        const cacheKey = getCacheKey(serviceName, fileId);
        if (_signedFileIdCache[cacheKey]) {
          _signedFileIdCache[cacheKey].state = 'ERROR';
        }

        document.querySelectorAll(`.wini-editor-inline-image[data-prepared-service-name="${serviceName}"][data-prepared-file-id="${fileId}"]`).forEach((elem) => {
          elem.classList.remove('wini-editor-inline-image--loading');
          elem.classList.add('wini-editor-inline-image--error');
        });
      })
    });

    pendingFileIdListByServiceMap[serviceName].forEach((fileId) => {
      const cacheKey = getCacheKey(serviceName, fileId);

      document.querySelectorAll(`.wini-editor-inline-image[data-prepared-service-name="${serviceName}"][data-prepared-file-id="${fileId}"]`).forEach((elem) => {
        elem.classList.remove('wini-editor-inline-image--error');
        elem.classList.add('wini-editor-inline-image--loading');
      });
    })
  });
}, 10);

const _applyPreparedSignedImage = (serviceName, fileIdList) => {
  fileIdList.forEach((fileId) => {
    let cacheKey = getCacheKey(serviceName, fileId);

    if (!_signedFileIdCache[cacheKey] || _signedFileIdCache[cacheKey].state !== 'DONE') {
      return;
    }

    let signedFileId = _signedFileIdCache[cacheKey].signedFileId;

    _signedFileIdCache[cacheKey].lastUsedAt = Date.now();

    const imgCache = new Image();
    imgCache.onload = () => {
      document.querySelectorAll(`.wini-editor-inline-image[data-prepared-service-name="${serviceName}"][data-prepared-file-id="${fileId}"]`).forEach((elem) => {
        elem.src = `${getTenantUrl()}/api/v1/${serviceName}/commonFile/preview/${signedFileId}`;
        elem.classList.remove('wini-editor-inline-image--loading');
      });
    }
    imgCache.onerror = function () {
      document.querySelectorAll(`.wini-editor-inline-image[data-prepared-service-name="${serviceName}"][data-prepared-file-id="${fileId}"]`).forEach((elem) => {
        elem.classList.remove('wini-editor-inline-image--loading');
        elem.classList.add('wini-editor-inline-image--error');
      });
    }
    imgCache.src = `${getTenantUrl()}/api/v1/${serviceName}/commonFile/preview/${signedFileId}`;
  });
};

if (window.__prevWiniEditorInlineImageErrorEventhandler) {
  document.removeEventListener('click', window.__prevWiniEditorInlineImageErrorEventhandler);
}
window.__prevWiniEditorInlineImageErrorEventhandler = (e) => {
  if (e.target.classList.contains('wini-editor-inline-image-placeholder')) {
    const serviceName = e.target.attributes['data-prepared-service-name'].value;
    const fileId = e.target.attributes['data-prepared-file-id'].value;

    if (serviceName && fileId) {
      prepareSignedImage(serviceName, fileId);
    }
  }
};

class EditorImageResize {
  editorElem = null;
  currentImage = null;
  resizing = false;

  options = {
    zIndex: 1000,
    editorInst: null,
    onResize: function (e, img, width, height) { }
  }

  constructor(editorElem, options) {
    this.options = { ...this.options, ...options };

    this.editorElem = editorElem;

    this.bindEventListeners();
  }

  destroy() {
    this.unbindEventListners();
  }

  createDOM(elementType, className, styles) {
    const elem = document.createElement(elementType);
    elem.className = className;
    this.setStyle(elem, styles);
    return elem;
  };

  calcOffset(elem) {
    const rect = elem.getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
  };

  setStyle(elem, styles) {
    for (let key in styles) {
      elem.style[key] = styles[key];
    }
    return elem;
  };

  removeResizeFrame() {
    document.querySelectorAll(".resize-frame,.resizer").forEach((item) => item.parentNode.removeChild(item));
  };

  bindEventListeners() {
    this.editorElem.addEventListener('click', this.onClick, false);
    this.editorElem.addEventListener('scroll', this.onScroll, false);
    this.editorElem.addEventListener('mouseup', this.onMouseUp);
  }

  unbindEventListners() {
    this.editorElem.removeEventListener('click', this.onClick);
    this.editorElem.removeEventListener('scroll', this.onScroll);
    this.editorElem.removeEventListener('mouseup', this.onMouseUp);
  }

  onClick = (e) => {
    if (!e.target) {
      return;
    }

    const hasRawUrl = e.target.dataset && e.target.dataset.rawUrl;
    const isEditorInlineImage = e.target.className && e.target.className.includes('wini-editor-inline-image');

    if (e.target.tagName === 'IMG' && (isEditorInlineImage || hasRawUrl)) {
      if (this.options.editorInst && this.options.editorInst.current && this.options.editorInst.current.wwEditor) {
        const wwEditor = this.options.editorInst.current.wwEditor;
        const imgPos = wwEditor.view.docView.posFromDOM(e.target);

        if (imgPos) {
          const scrollTop = wwEditor.getScrollTop();

          wwEditor.setSelection(imgPos, imgPos + 1);

          // setSelection시 스크롤이 이동 되는 경우가 있어서 다시 스크롤을 원래 위치로 이동시킴
          wwEditor.setScrollTop(scrollTop);
        }
      }

      this.clickImage(e.target);
    }
  }

  onScroll = (e) => {
    if (this.currentImage) {
      this.clickImage(this.currentImage);
    }
  }

  onMouseUp = (e) => {
    if (!this.resizing) {
      const x = (e.x) ? e.x : e.clientX;
      const y = (e.y) ? e.y : e.clientY;
      let mouseUpElement = document.elementFromPoint(x, y);
      if (mouseUpElement) {
        let matchingElement = null;
        if (mouseUpElement.tagName === 'IMG') {
          matchingElement = mouseUpElement;
        }
        if (!matchingElement) {
          this.reset();
        } else {
          this.clickImage(matchingElement);
        }
      }
    }
  }

  clickImage(img) {
    this.removeResizeFrame();
    this.currentImage = img;
    this.renderFrame(img);

    const parentOffset = this.getParentOffset(img);
    const imgPosition = {
      top: img.offsetTop + parentOffset.top,
      left: img.offsetLeft + parentOffset.left
    };
    const editorScrollTop = this.editorElem.scrollTop;
    const editorScrollLeft = this.editorElem.scrollLeft;

    const orgImgSize = {
      width: img.width,
      height: img.height
    };

    const orgImgRatio = orgImgSize.height > 0 ? orgImgSize.width / orgImgSize.height : 1;

    document.querySelector('.resize-frame').onmousedown = () => {
      this.resizing = true;
      return false;
    };

    this.editorElem.onmouseup = (e) => {
      if (this.resizing) {
        const width = document.querySelector('.top-border').offsetWidth;
        const height = document.querySelector('.left-border').offsetHeight;

        const currentImage = this.currentImage;

        this.options.onResize(e, this.currentImage, width, height);

        if (this.options.editorInst && this.options.editorInst.current && this.options.editorInst.current.wwEditor) {
          const wwEditor = this.options.editorInst.current.wwEditor;
          const imgDesc = wwEditor.view.docView.getDesc(this.currentImage);

          if (imgDesc && imgDesc.node) {
            const node = imgDesc.node;

            node.attrs.htmlAttrs['data-raw-url'] = node.attrs.htmlAttrs['data-raw-url'].replace(/@(w=|h=)[^@]+/g, '') +
              '@w=' + width + '@h=' + height + '';
            node.attrs.imageUrl = node.attrs.htmlAttrs['data-raw-url'];

            this.options.editorInst.current.wwEditor.eventEmitter.emit('change');
          }
        }

        this.refresh();

        if (currentImage) {
          currentImage.click();
        }

        setTimeout(() => {
          this.resizing = false;
        }, 0)
      }
    };

    this.editorElem.onmousemove = (e) => {
      if (this.currentImage && this.resizing) {
        const editorOffset = this.calcContentEditorOffset();
        let height = e.pageY - this.calcOffset(this.currentImage).top;
        let width = e.pageX - this.calcOffset(this.currentImage).left;
        height = height < 1 ? 1 : height;
        width = width < 1 ? 1 : width;

        if (e.shiftKey && orgImgRatio > 0.0001) {
          height = width / orgImgRatio;
        }

        const top = imgPosition.top - editorScrollTop - 1 + editorOffset.top;
        const left = imgPosition.left - editorScrollLeft - 1 + editorOffset.left;
        this.setStyle(document.querySelector('.resize-frame'), {
          top: (top + height - 10 - 4) + 'px',
          left: (left + width - 10 - 4) + "px"
        });

        this.setStyle(document.querySelector('.top-border'), { width: width + "px" });
        this.setStyle(document.querySelector('.left-border'), { height: height + "px" });
        this.setStyle(document.querySelector('.right-border'), {
          left: (left + width) + 'px',
          height: height + "px"
        });
        this.setStyle(document.querySelector('.bottom-border'), {
          top: (top + height) + 'px',
          width: width + "px"
        });
      }
      return false;
    };
  }

  getContentEditorElem() {
    return this.editorElem.querySelector('.toastui-editor-contents.ProseMirror');
  }

  calcContentEditorOffset() {
    const contentEditorElem = this.getContentEditorElem();

    if (contentEditorElem) {
      return { top: - contentEditorElem.scrollTop, left: contentEditorElem.scrollLeft };
    }

    return { top: 0, left: 0 };
  }

  bindClickListener() {
    return;
    this.editorElem.querySelectorAll('img').forEach((img, i) => {
      img.onclick = (e) => {
        if (e.target === img) {
          this.clickImage(img);
        }
      };
    });
  }

  refresh() {
    this.bindClickListener();
    this.removeResizeFrame();
    if (!this.currentImage) {
      return;
    }

    this.renderFrame(this.currentImage);
  }

  getParentOffset(elem) {
    let top = 0;
    let left = 0;

    let parentElem = elem.parentElement;
    while (parentElem) {
      if (parentElem.classList.contains('ProseMirror')) {
        break;
      }

      if (parentElem && window.getComputedStyle(parentElem).position === 'relative') {
        // const rect = parentElem.getBoundingClientRect();
        top += parentElem.offsetTop;
        left += parentElem.offsetLeft;
      }

      parentElem = parentElem.parentElement;
    }

    return { top, left };
  }

  renderFrame(img) {
    const editorOffset = this.calcContentEditorOffset();
    const imgHeight = img.offsetHeight;
    const imgWidth = img.offsetWidth;
    const parentOffset = this.getParentOffset(img);
    const imgPosition = {
      top: img.offsetTop + parentOffset.top,
      left: img.offsetLeft + parentOffset.left
    };
    const editorScrollTop = this.editorElem.scrollTop;
    const editorScrollLeft = this.editorElem.scrollLeft;
    const top = Math.round(imgPosition.top - editorScrollTop - 1 + editorOffset.top);
    const left = Math.round(imgPosition.left - editorScrollLeft - 1 + editorOffset.left);

    let parentElem = this.getContentEditorElem();
    parentElem = parentElem ? parentElem.parentElement : this.editorElem;

    parentElem.append(this.createDOM('span', 'resizer top-border', {
      position: 'absolute',
      top: (top) + 'px',
      left: (left) + 'px',
      borderTop: 'dashed 1px grey',
      width: imgWidth + 'px',
      height: '0px',
      zIndex: this.options.zIndex
    }));

    parentElem.append(this.createDOM('span', 'resizer left-border', {
      position: 'absolute',
      top: (top) + 'px',
      left: (left) + 'px',
      borderLeft: 'dashed 1px grey',
      width: '0px',
      height: imgHeight + 'px',
      zIndex: this.options.zIndex
    }));

    parentElem.append(this.createDOM('span', 'resizer right-border', {
      position: 'absolute',
      top: (top) + 'px',
      left: (left + imgWidth) + 'px',
      borderRight: 'dashed 1px grey',
      width: '0px',
      height: imgHeight + 'px',
      zIndex: this.options.zIndex
    }));

    parentElem.append(this.createDOM('span', 'resizer bottom-border', {
      position: 'absolute',
      top: (top + imgHeight) + 'px',
      left: (left) + 'px',
      borderBottom: 'dashed 1px grey',
      width: imgWidth + 'px',
      height: '0px',
      zIndex: this.options.zIndex
    }));

    parentElem.append(this.createDOM('span', 'resize-frame', {
      margin: '10px',
      position: 'absolute',
      top: (top + imgHeight - 10 - 4) + 'px',
      left: (left + imgWidth - 10 - 4) + 'px',
      border: 'solid 2px #1976d2',
      width: '6px',
      height: '6px',
      cursor: 'se-resize',
      background: '#fff',
      zIndex: this.options.zIndex
    }));

    const contentEditorElem = this.getContentEditorElem();

    if (contentEditorElem) {
      contentEditorElem.onscroll = () => {
        contentEditorElem.onscroll = undefined;

        if (this.currentImage) {
          this.clickImage(this.currentImage);
        }
      }
    }
  }

  reset() {
    if (this.currentImage != null) {
      this.currentImage = null;
      this.resizing = false;
      this.removeResizeFrame();
    }

    this.bindClickListener();
  };
}

const winiEditorImageUploadHook = async (serviceName, uploadType, blob) => {
  const connector = new Communicator();
  const connector2 = new OpenCommunicator();
  const uploadInfoList = [];

  // 이미지 크기 불러오기
  let imageWidth = null;
  let imageHeight = null;

  try {
    const bmp = await createImageBitmap(blob);
    imageWidth = bmp.width;
    imageHeight = bmp.height;
    bmp.close();
  } catch {
    // 이미지 크기를 가져오지 못해도 업로드는 진행
  }

  try {
    const files = [];

    if (uploadType === 'paste') {
      files.push({
        name: `클립보드_${winiDate.dateFormat(winiDate.now(), 'YYYYMMDD_HHmmss')}.png`,
        size: blob.size,
      });
    } else {
      files.push(blob);
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      let fileInfo = {
        "entityId": null,
        "entityName": null,
        "extraInfo": null,
        "fileName": file.name,
        "fileSize": file.size,
        "subKey": null,
        "fileOrigin": "WINI_EDITOR",
        "width": imageWidth,
        "height": imageHeight
      };
      const response = await connector.client.post(`/api/v1/${serviceName}/commonFile/prepareImageUpload`, fileInfo);

      fileInfo = { ...fileInfo, ...response.data.data };

      uploadInfoList.push(fileInfo);
    }
  } catch {
    winiMsg.showAlert('파일 업로드 준비에 실패했습니다.');
    return;
  }

  try {
    if (uploadInfoList.length) {
      const uploadInfo = uploadInfoList[0];
      await connector2.client({
        method: 'put',
        url: uploadInfo.uploadUrl,  // S3 URL
        data: blob,
        headers: {
          'Content-Type': 'application/octet-stream',
          'Authorization': null,  // S3는 별도의 인증이 필요 없고, 있을 경우 400오류가 발생하므로 헤더에서 삭제함
          'X-Org-Id': null,
        }
      })

      return uploadInfo;
    }
  } catch {
    winiMsg.showAlert('파일 업로드에 실패했습니다.');
  }

  return;
};

let __imageId = 1;

function getNextImageId() {
  return __imageId++;
}

function winiEditorImagePlugin() {
  return {
    toMarkdownRenderers: {
      image(node, context) {
        let { imageUrl, altText, htmlAttrs } = node.node.attrs;

        if (htmlAttrs && htmlAttrs['data-raw-url']) {
          imageUrl = htmlAttrs['data-raw-url'];
        }

        if (!imageUrl.startsWith('@')) {
          if (htmlAttrs && htmlAttrs['data-prepared-service-name'] && htmlAttrs['data-prepared-file-id']) {
            imageUrl = `@${htmlAttrs['data-prepared-service-name']}@${htmlAttrs['data-prepared-file-id']}`;

            htmlAttrs['data-raw-url'] = imageUrl;
          } else {
            const matches = imageUrl.match(/\/api\/v1\/([^\/]+)\/commonFile\/preview\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/);

            if (matches && matches.length > 2) {
              imageUrl = `@${matches[1]}@${matches[2]}`;
            }
          }
        }

        return {
          attrs: { imageUrl, altText }
        }
      },
    },
    wysiwygNodeViews: {
      image: function (node, editorView) {
        const hasRawUrl = node.attrs.htmlAttrs && node.attrs.htmlAttrs['data-raw-url'];
        let rawUrl = hasRawUrl ? node.attrs.htmlAttrs['data-raw-url'] : node.attrs.imageUrl;
        let style = '';

        if (rawUrl) {
          if (rawUrl.includes(base64ImgMagicTag)) {
            rawUrl = atob(rawUrl.split(base64ImgMagicTag)[1]);

            const [imgServiceName, preparedFileId] = rawUrl.substring(1).split('@');
          }

          node.attrs.imageUrl = rawUrl;

          const urlParts = rawUrl.split('@');

          if (urlParts.length > 1) {
            urlParts.forEach((part) => {
              const matches = part.match(/(w|h)=([0-9]+)/);

              if (matches && matches.length > 2) {
                if (part.startsWith('w=')) {
                  style += 'width: ' + matches[2] + 'px;';
                } else if (part.startsWith('h=')) {
                  style += 'height: ' + matches[2] + 'px;';
                }
              }
            });
          }
        }

        if (!rawUrl.startsWith('@')) {
          node.attrs.imageUrl = rawUrl.replace(/@.*/g, '');

          node.attrs.htmlAttrs = {
            ...node.attrs.htmlAttrs,
            'data-raw-url': rawUrl,
            'data-image-id': getNextImageId(),
            'style': style
          };

          return;
        }

        const imageUrlParts = node.attrs.imageUrl.split('@');

        const serviceName = imageUrlParts[1];
        let fileId = imageUrlParts[2].replace(/ =.*$/, '');

        node.attrs.imageUrl = prepareSignedImage(serviceName, fileId);
        node.attrs.classNames = ['wini-editor-inline-image', 'is-preparing-file-id'];

        if (getCacheState(serviceName, fileId) === 'ERROR') {
          node.attrs.classNames.push('wini-editor-inline-image--error');
        }

        node.attrs.htmlAttrs = {
          ...node.attrs.htmlAttrs,
          'data-raw-url': rawUrl,
          'data-prepared-service-name': serviceName,
          'data-prepared-file-id': fileId,
          'data-image-id': getNextImageId(),
          'style': style
        };
      }
    },
    wysiwygCommands: {
      resize: ({ width, height, imageId }, { tr, selection, schema }, dispatch) => {
        if (width && height) {
          const { from, to } = selection;

          let findByImageId = (content, imageId) => {
            if (content.attrs && content.attrs.htmlAttrs && content.attrs.htmlAttrs['data-image-id'] == imageId) {
              return content;
            }

            let result = null;

            content.forEach((childContent) => {
              if (result) return;

              if (childContent) {
                result = findByImageId(childContent, imageId);
              }
            });

            return result;
          };
          let node = findByImageId(tr.doc.content, imageId)

          if (node) {
            node.attrs.htmlAttrs['data-raw-url'] =
              node.attrs.htmlAttrs['data-raw-url'].replace(/@(w=|h=)[^@]+/g, '') +
              '@w=' + width + '@h=' + height + '';
          }
        }

        return;
      }
    }
  }
}

document.addEventListener('click', window.__prevWiniEditorInlineImageErrorEventhandler);

export { prepareSignedImage, customHtmlImageRenderer, winiEditorImageUploadHook, winiEditorImagePlugin, EditorImageResize };