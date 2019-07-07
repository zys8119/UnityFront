import * as TaskQueue from "./Task/index"
export default  [
    ...Object.keys(TaskQueue).map(Task=>TaskQueue[Task])
]