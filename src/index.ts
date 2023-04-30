// eslint-disable-next-line max-classes-per-file
import { NS } from '/hacknet/infra/interface/NetscriptDefinitions';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function main(ns: NS) {
  // eslint-disable-next-line no-use-before-define
  const context = new Context();

  context.request1();
  context.request2();
}

class Context {
  // eslint-disable-next-line no-use-before-define
  private state: State = new ConcreteStateA(this);

  // eslint-disable-next-line no-use-before-define
  public transitionTo(state: State): void {
    console.log(`Context: Transition to ${state.constructor.name}.`);
    this.state = state;
    // this.state.setContext(this);
  }

  public request1(): void {
    this.state.handle1();
  }

  public request2(): void {
    this.state.handle2();
  }
}

interface State {
  context: Context;
  handle1(): void;
  handle2(): void;
}

// abstract class State {
//   protected context: Context;
//
//   public setContext(context: Context) {
//     this.context = context;
//   }
//
//   public abstract handle1(): void;
//
//   public abstract handle2(): void;
// }

class ConcreteStateA implements State {
  constructor(public context: Context) {}
  public handle1(): void {
    console.log('ConcreteStateA handles request1.');
    console.log('ConcreteStateA wants to change the state of the context.');
    // eslint-disable-next-line no-use-before-define
    this.context.transitionTo(new ConcreteStateB(this.context));
  }

  // eslint-disable-next-line class-methods-use-this
  public handle2(): void {
    console.log('ConcreteStateA handles request2.');
  }
}

class ConcreteStateB implements State {
  constructor(public context: Context) {}
  // eslint-disable-next-line class-methods-use-this
  public handle1(): void {
    console.log('ConcreteStateB handles request1.');
  }

  public handle2(): void {
    console.log('ConcreteStateB handles request2.');
    console.log('ConcreteStateB wants to change the state of the context.');
    this.context.transitionTo(new ConcreteStateA(this.context));
  }
}
