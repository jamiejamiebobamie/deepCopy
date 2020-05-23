
class Node {
    constructor(value, next, last){
        this.value = value;
        this.next = null;
        this.last = null;
    }
}

class LinkedList { //doesn't work with lasts(?), but nexts work
    constructor(){
    this.head = null;
    this.tail = null;
    this.len = 0;
    this.last = null
    }

    addNode(value){
        let newNode = new Node(value);
        newNode.next = this.head; //circular lists. each node's next is initially pointed to the head.
        if (this.last != null){
            newNode.last = this.last
            this.tail = newNode;
            this.last.next = newNode
        } else {
            this.head = newNode;
            this.tail = newNode;
        }
        this.len = this.len + 1;
        this.last = newNode;
    }

    removeNode(node1, node2){ //remove node2
        if (node2 != null){
        node1.next = node2.next
        this.len = this.len - 1; //I am not updating lasts
        }
    }

}
