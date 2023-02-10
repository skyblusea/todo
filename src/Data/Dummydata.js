export const initialState =
{
  "todos": [
    {
      id:new Date().toISOString().substring(0,10)+0,
      content: '병원 예약하기',
      isDone: false,
      date: new Date().toISOString().substring(0,10),
      tag: '할일'
    }
  ]
}
