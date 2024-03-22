export interface history{
    icon:String
    content:chat | groupChat
}

interface chat{
    id:String,
    target:String,
    messages:Array<message>
}

interface groupChat{
    id:String,
    members:Array<String>,
    messages:Array<message>
}

interface message{
    author:String,
    message:String,
    timestamp:Date,
    position:Number
}