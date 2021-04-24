import BoardState from './BoardState';

class History {
  private prev: BoardState[];
  private next: BoardState[];

  constructor() {
    this.prev = [];
  }
  public push(state: BoardState): void {
    this.prev.push(state);
    this.next = [];
  }

  public undo(): BoardState | undefined {
    if(this.prev.length > 0){
        this.next.push(this.prev.pop()); 
    }
    const lastIndex = this.prev.length - 1;
    return lastIndex >= 0 ? this.prev[lastIndex] : undefined;
  }
  public redo(): BoardState | undefined {
      if(this.next.length > 0){
        this.prev.push(this.next.pop()); 
      }
      const lastIndex = this.prev.length - 1;
      return lastIndex >= 0 ? this.prev[lastIndex] : undefined;
  }

  
}

export default History;
