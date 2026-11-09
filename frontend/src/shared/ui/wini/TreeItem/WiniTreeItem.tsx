interface WiniTreeItemProps {
  // define your props here
  /**
   * 해당 필드로 라벨 보여줌. 보내지 않으면 "name 이라는 필드로 라벨 바인드"* 
   */
  name?:string;
  /**
   * {column:'',leaf:""}로 써야함
   * 폴더로 지정할 값지정. 안주면 그냥 children 있으면 폴더가됨!
   * 예제)  branch = {{column:'menuType',value:'MENU'}}   예제 설멍 -> menuType 이라는 필드 값이'MENU' 이면 폴더 아니면 일반노드
							column:은 구분자 컬럼 구분자가  ex( menuType 이라는 필드)
							value: 폴더가 될 필드 값 (ex :'MENU')
							->해당 컬럼과 값으로 구분하여 폴더또는 파일 로 구분 
   */
  branch? : any;
  field? : string;
}

declare function  WiniTreeItem(props:WiniTreeItemProps) : JSX.Element;

export default WiniTreeItem;