/*
function ListNode(val) {
    this.val = val;
    this.next = null;
}

let a = new ListNode(4);
let b = a.next = new ListNode(1);
let c = b.next = new ListNode(8);
let d = c.next = new ListNode(4);
let e = d.next = b;

//判断是否有环
//比如上述是有环的
 */

/**
 * 
 * @param head ListNode类 
 * @return bool布尔型
 */
function hasCycle(head) {
    // write code here
    let fast = head;
    let slow = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (fast === slow) {
            return true;
        }
    }
    return false;
}