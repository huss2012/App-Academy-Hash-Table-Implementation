class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable { // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    // Initialize your buckets here
    // Your code here
    this.count = 0;
    this.capacity = numBuckets;
    this.data = new Array(this.capacity).fill(null);
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }


  insert(key, value) {
    // Your code here
    //1.Create the keyValuePair:
    let keyValuePair = new KeyValuePair(key, value);
    //2.Create the index:
    let index = this.hashMod(key);
    //Check if there is an element at the index:
    if (this.data[index]) {
      //Handel same key different value insertion:
      /*The goal is to search in the linked list for the same key if so overwrite the value
      ToDo so we need to loop through the linked list using while loop till reach to null pointer*/
      let head = this.data[index];

      while (head) {
        if (head.key === key) {
          head.value = value;
          return;
        }
        //update the head => move to the next node:
        head = head.next;
      }

      //Handel different key same hash insertion:
      keyValuePair.next = this.data[index];//add to the head of the linkled list.
    }
    //3.Insert at the index:
    this.data[index] = keyValuePair;//Update the head of the likned list to point to the current insearted keyValuePair.
    //4.Update the count:
    this.count++;
  }


  read(key) {
    // Your code here
    let index = this.hashMod(key);
    let head = this.data[index];

    /*mean there is more then one element at the index
    => there is a linked list, a hash collison happend*/
    if (head.next) {
      while (head) {
        if (head.key === key) {
          return head.value;
        }
        //Update the head or move through the linked list.
        head = head.next;
      }
    }
    if (head.key !== key) return undefined;
    //if there is an element
    return this.data[index].value;//this will work if there is not hash collison inseartion
  }


  resize() {
    // Your code here
  }


  delete(key) {
    // Your code here
  }
}


module.exports = HashTable;
