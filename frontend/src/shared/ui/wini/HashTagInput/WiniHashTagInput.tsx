interface HashTagInputProps  {
    chips:any[],
    onChange:Function
    viewCount?:number,
    limitCount?:number,
    readOnly?:boolean,
    maxWidth?:number,
    height?:number,
    chipProps:object
}

// declare const WiniHashTagInput: React.ForwardRefExoticComponent<HashTagInputProps & React.RefAttributes<HTMLDivElement>>;
declare function  WiniHashTagInput(props:HashTagInputProps) : JSX.Element;

export default WiniHashTagInput;