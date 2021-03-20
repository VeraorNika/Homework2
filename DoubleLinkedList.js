//Класс для Элемента двусвязного списка
class DoubleLinkedListItem {
    constructor(value, next = null, previous = null) {
        this.value = value;
        this.next = next;
        this.previous = previous;
    }
    //На случай, если элемент окажется объектом, у которого есть toString
    toString() {
        if (typeof this.value != "object") { console.log(this.value); return; }
        this.value.toString();
        return;
        //return some_function ? some_function(this.value) : `${this.value}`;
    }
}
//Класс для двусвязного списка
class DoubleLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    addFirst(value) {
        // Создаём новый узел- будущий head, его next -это текущий head
        const newItem = new DoubleLinkedListItem(value, this.head);

        // Текущий head становится "серединным" элементом со previous = новый head
        if (this.head) {
            this.head.previous = newItem;
        }

        // Обновляем head
        this.head = newItem;

        //На случай, если список был пустой до добавления: новый элемент станет также и tail
        if (!this.tail) {
            this.tail = newItem;
        }

        // Возвращаем весь список
        this.length++;
        return this;
    }
    addLast(value) {
        // Создаём новый узел -будущий tail, его previous -это текущий tail
        const newItem = new DoubleLinkedListItem(value);
        newItem.previous = this.tail;

        //Если список был непустой до добавления, то текущий tail приобретает ссылку next = будущий tail
        if (this.tail) {
            // Присоединяем новый узел к концу связного списка.
            this.tail.next = newItem;
        }

        //Обновляем tail
        this.tail = newItem;

        // Если ещё нет head, делаем новый узел head.
        if (!this.head) {
            this.head = newItem;
        }
        this.length++;
        return this;
    }
    add(value, position) {
        let currentItem = this.head;
        let length = this.length;
        let count = 0;
        let error_message = { failure: 'Such position does not exist.', };
        let ItemAfterChosen = null;

        // Невозможно удалить из-за пустого списка/неправильной позиции
        if (position < 0) {
            throw new Error(error_message.failure);
        }

        if (position === 0) {
            this.addFirst(value);
            return;
        }


        if (position >= this.length - 1) {
            this.addLast(value);
            return;
        }
        while (count < position - 1) {
            currentItem = currentItem.next;
            count++;
        }
        const newItem = new DoubleLinkedListItem(value, currentItem.next, currentItem);
        ItemAfterChosen = currentItem.next;
        ItemAfterChosen.previous = newItem;
        currentItem.next = newItem;
        this.length++;
        return;
    }

    //Удалить  и вернуть последний элемент
    deleteTail() {
        // Если нет tail - список пуст.
        if (!this.tail) {
            return null;
        }

        // Сохраняем значение последнего узла, чтобы потом вернуть его
        const deletedTail = this.tail;

        // Если у tail есть ссылка на предыдущий узел:
        if (this.tail.previous) {
            // обновляем tail 
            this.tail = this.tail.previous;
            //и ставим next=null, как и должно быть у tail
            this.tail.next = null;
        } else {
            //Ссылки не было - значит, мы удалили последний элемент
            this.head = null;
            this.tail = null;
        }
        if (this.length != 0) this.length--;
        return deletedTail;
    }


    //Удалить первый элемент и вернуть его
    deleteHead() {
        // Если нет head - список пуст.
        if (!this.head) {
            return null;
        }

        // Сохраняем значение первого узла, чтобы потом вернуть
        const deletedHead = this.head;

        // Если у head есть ссылка на следующий узел,
        if (this.head.next) {
            // обновляем head 
            this.head = this.head.next;
            //и ставим previous =null, как и должно быть у head
            this.head.previous = null;
        } else {
            // Ссылки не было - значит, мы удалили последний элемент.
            this.head = null;
            this.tail = null;
        }
        if (this.length != 0) this.length--;
        return deletedHead;
    }
    delete(position) {
        let currentItem = this.head;
        let length = this.length;
        let count = 0;
        let error_message = { failure: 'Such position does not exist', };
        let ItemBeforeChosen = null;
        let ItemForDelete = null;
        let ItemAfterChosen = null;

        // Невозможно удалить из-за пустого списка/неправильной позиции
        if (length === 0 || position < 0 || position > length - 1) {
            throw new Error(error_message.failure);
        }

        if (position === 0) {
            return this.deleteHead();
        }


        if (position === this.length - 1) {
            return this.deleteTail();
        }
        while (count < position) {
            currentItem = currentItem.next;
            count++;
        }

        ItemBeforeChosen = currentItem.previous;
        ItemForDelete = currentItem;
        ItemAfterChosen = currentItem.next;

        ItemBeforeChosen.next = ItemAfterChosen;
        ItemAfterChosen.previous = ItemBeforeChosen;
        this.length--;
        return currentItem;
    }
    //Находит первое value в списке и возвращает его позицию
    findFirst(value) {
        // Если нет head - список пуст.
        if (!this.head) {
            return -1;
        }

        let currentItem = this.head;
        let position = 0;
        // Перебираем все узлы в поиске значения. Если значение не нашлось, next=null (у tail)и заканчиваем поиск
        while (currentItem) {
            // Если значение ненулевое, сравниваем с очередным элементом
            if (value !== undefined && currentItem.value === value) {
                return position;
            }

            // Перематываем на один узел вперед.
            currentItem = currentItem.next;
            position++;
        }

        return -1;
    }
    findItem(position) {
        let currentItem = this.head;
        let count = 0;
        let error_message = { failure: 'Such position does not exist.', };


        // Невозможно удалить из-за пустого списка/неправильной позиции
        if (position < 0 || position > this.length - 1) {
            throw new Error(error_message.failure);
        }

        while (count < position) {
            currentItem = currentItem.next;
            count++;
        }
        return currentItem.value;
    }
    //Создает список из массива.
    fromArray(values) {
        values.forEach(value => this.addLast(value));

        return this;
    }

    // Создаёт массив из всех узлов и возвращает его.
    toArray() {
        const Array = [];

        let currentItem = this.head;

        // Перебираем все узлы и добавляем в массив.
        while (currentItem) {
            Array.push(currentItem.value);
            currentItem = currentItem.next;
        }

        // Возвращаем массив из всех узлов.
        return Array;
    }

    reverse() {
        let currentItem = this.head;
        let previousItem = null;
        let nextItem = null;

        // Перебираем все узлы.
        while (currentItem) {
            // Сохраняем предыдущий и следующий узлы.
            nextItem = currentItem.next;
            previousItem = currentItem.previous;

            // Меняем ссылку на следующий "next" узел текущего узла,
            // чтобы он ссылался на предыдущий узел.
            // Так как мы меняем их местами, нужно поменять и ссылки на узлы.
            // Изначально, первый узел не имеет предыдущего узла,
            // поэтому после перестановки его "next" станет "null".
            currentItem.next = previousItem;


            currentItem.previous = nextItem;
            // Текущий узел делаем предыдущим.
            previousItem = currentItem;
            // Следующий узел становится текущим.
            currentItem = nextItem;
        }

        // Меняем head и tail местами.
        this.tail = this.head;
        this.head = previousItem;


        return this;
    }
    //Отображение
    print() {

        let currentItem = this.head;
        if (currentItem === null) { console.log('DoubleList:{}, length:0'); return; };
        console.log(`Double List: {`);
        while (currentItem) {
            currentItem.toString();
            currentItem = currentItem.next;
        }
        console.log(`}, length=${this.length}`);
    }

    // На каждом узле вызываем метод toString,
    // что бы получить значение в виде строки.
    // array.map(node => node.toString(callback)).toString();
    // Вызываем метод toString на массиве строк.

}

//Функции для работы с сайтом
let DL = null;
let isCreated = false;
let counterForReverse = 0;

function create() {
    if (!isCreated) {
        DL = new DoubleLinkedList();
        let dl = document.createElement('div');
        dl.id = "doublelinkedlist";
        // dl.innerHTML = "Я новый двусвязный список!";
        dl.style.display = "flex";
        dl.style.width = "90%";
        dl.style.minHeight = "300px";
        dl.style.border = "1px solid black";
        dl.style.margin = "20px auto";
        dl.style.flexDirection = "row";
        dl.style.justifyContent = "center";
        dl.style.alignContent = "center";
        dl.style.alignItems = "center";
        dl.style.flexWrap = "wrap";
        let container = document.getElementById('container');
        container.append(dl);
        isCreated = true;
        return;
    }
    alert('Список уже создан');
    return;
}

function remove() {
    if (isCreated) {
        DL = null;
        isCreated = false;
        let dl = document.getElementById("doublelinkedlist");
        dl.remove();
        return;
    }
    alert('Нечего удалять');
    return;
}

function addfirst() {
    if (isCreated) {
        let value;
        if (value = prompt('Значение?', 0)) {
            DL.addFirst(value);
            let head = document.createElement('div');
            head.innerHTML = value;
            head.style.display = "block";
            head.style.minWidth = "40px";
            head.style.minHeight = "40px";
            head.style.border = "1px solid black";
            head.style.margin = "10px";

            let doublelist = document.getElementById('doublelinkedlist');
            // doublelist.innerHTML = null;
            doublelist.prepend(head);
            DL.print();
            return;
        }
        else {
            alert('Добавление отменено');
            return;
        }
    }

    alert('Создайте список');
    return;
}


function addlast() {
    if (isCreated) {
        let value;
        if (value = prompt('Значение?', 0)) {
            DL.addLast(value);
            let tail = document.createElement('div');
            tail.innerHTML = value;
            tail.style.display = "block";
            tail.style.minWidth = "40px";
            tail.style.minHeight = "40px";
            tail.style.border = "1px solid black";
            tail.style.margin = "10px";

            let doublelist = document.getElementById('doublelinkedlist');
            //doublelist.innerHTML = null;
            doublelist.append(tail);
            DL.print();
            return;
        }
        else {
            alert('Добавление отменено');
            return;
        }
    }

    alert('Создайте список');
    return;
}


function deleteHead() {
    if (isCreated) {
        DL.deleteHead();
        let dl = document.getElementById('doublelinkedlist');
        let head = dl.firstElementChild;
        if (head) {
            head.remove();
            DL.print();
            return;
        }
        else {
            alert('Список пуст!');
            return;
        }
    }
    alert('Вы не создали ничего, чтобы разрушать');
    return;
}
function deleteTail() {
    if (isCreated) {
        DL.deleteTail();
        let dl = document.getElementById('doublelinkedlist');
        let tail = dl.lastElementChild;
        if (tail) {
            tail.remove();
            DL.print();
            return;
        }
        else {
            alert('Список пуст!');
            return;
        }

    }
    alert('Вы не создали ничего, чтобы разрушать');
    return;
}


function reverse() {
    if (isCreated) {
        DL.reverse();
        let dl = document.getElementById('doublelinkedlist');
        if (counterForReverse % 2 == 0) { dl.style.flexDirection = "row-reverse"; }
        else { dl.style.flexDirection = "row"; }
        DL.print();
        counterForReverse++;
        return;
    }
    alert('А что переворачивать? Создайте список');
    return;
}

function find() {
    if (isCreated) {
        let value;
        let count=0;
        if (value = prompt('Значение?', null)) {
            let array = document.getElementById('doublelinkedlist').children;
            for (let item of array) {
                if (item.innerHTML==value){count++; item.style.background="red";}
            }
            if (count==0) alert('Таких элементов нет');
            return;
        }
    }
    alert('Чтобы что-то найти, нужно, чтобы оно было. Создайте список');
    return;
}

function reset(){
    if(!isCreated){return};
    let array = document.getElementById('doublelinkedlist').children;
    for (let item of array) {
        if (item.style.background=="red"){item.style.background="inherit";}
    }
    return;
}


// //Примеры работы различных функций

// //Добавить в конец/в начало/в середину     /удалить из конца/начала/середины      /вывести список    /найти по значению
// let dl = new DoubleLinkedList();
// dl.addFirst(10);
// dl.addFirst(20);
// dl.addLast(30);
// dl.addLast(40);
// dl.addLast(50);
// dl.addLast(60);
// dl.add("str", 2);
// dl.add(70, 2);
// dl.print();

// console.log('\n\n');
// dl.delete(3);
// dl.deleteTail();
// dl.deleteHead();
// dl.print();

// console.log('\n\n');

// console.log(dl.findFirst(10));
// console.log(dl.findItem(2));

// //Перевернуть
// dl.addLast(40);
// dl.addLast(50);
// dl.addLast(60);
// dl.addLast(70);
// console.log('\nДо переворачивания:');
// dl.print();
// console.log('\n\n');
// console.log('После переворачивания');
// dl.reverse();
// dl.print();
// console.log('\n\n');

// //превратить в массив/превратить массив в doublelist
// let array = dl.toArray();
// console.log('Получившийся массив: '+array);

// array = [1, 2, 3, 4, 5, 6];
// dl = new DoubleLinkedList();
// dl.fromArray(array);
// dl.print();

