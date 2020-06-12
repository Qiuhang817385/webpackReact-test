const hello = (name: string) => {
  return 'hello' + name
}
console.log('hello(123)', hello('123'))

// 这个可以
let num: number = undefined

let num2: number | string = '123'

let array1: number[] = [1, 2, 3]

let user: [string, number] = ['1', 2]

// 定义object的类型
// 1.对对象的形状进行描述
// 2.对类进行抽象
// 3.鸭子类型
interface Person {
  name: string
  age: number
}
let p1: Partial<Person> = {
  name: '123',
  age: 1,
}

let getName: (name: string) => string = () => {
  return name + '123'
}
let getName3: (name: string) => string = function () {
  return name
}

let getName2 = (name: string): string => {
  return name
}

class AAA {
  static isAAA(a) {
    return a instanceof AAA
  }
}
const a = new AAA()
console.log('AAA.isAAA', AAA.isAAA(a))

interface onAoff {
  switchRadio(triggerL: boolean): void
}
interface Battery {
  checkBatteryStatus(): void
}
// implements
// 这里不传递参数居然不会报错
class Car implements onAoff {
  switchRadio() {}
}
class Phone implements onAoff, Battery {
  switchRadio() {}
  checkBatteryStatus() {}
}
