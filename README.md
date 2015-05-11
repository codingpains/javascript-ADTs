# Abstract Data Types in Javascript.

## Introduction.

An Abstract Data Type is an object that provides a set of values (data) and a set of operations (semantics) to interact with the values. We can see it as a wrapper of a Data Structure that comes with an API to read and write to that Data Structure without exposing the implementation.

## Real World Example.

Even when ADT's are concepts of computing, we can better understanding by looking at stuff that surrounds us. Imagina Soda Vending Machine, this machine is sealed and you can not look at the insides, you have no idea how the bottles are stored inside and what mechanism is there to take your money, grab a soda and deliver it to you but you know how to interact with it through its API.

1. Receive money.
2. Receive desired soda request.
3. Deliver soda.
4. Give change.

In the inside the vendor machine can have 5 vertical lanes holding soda bottles, one kind of soda per lane. Or it can have an icebox filled with soda bottles and a person taking order, selecting the right soda and putting it in the take-out port. Those details remain hidden to you.

## Computing examples.

When writting a program we run into many ADTs, for instance an Integer is an ADT, it holds the value of the integer and gives us operations to work with it such as sum and multiply. It´s internal data structure could be binary data and the operation work at that level, or it could be a hexadecimal string, or a scientific notation value, the point is when you are writting the program you use the Integer as an Integer and not as a binary number or whatever it is in the inside.

We can also find semaphores, they are ADTs that can be implemented as a value that can only be changed by using a `wait` operation to get access to a resource or a `signal` operation to release a resource. The inside value could be anything from a boolean, integer, array, string, etc. A boolean semaphore would have a boolean value in the inside that would go to false in the `wait` operation and back to true in the `signal` operation. A counting semaphore could have a number of resources that would decrease when the `wait`operation is called and increase when the `signal` operation is called, or could have an empty array that gets filled when the `wait` operation is called and emptied with the `signal` operation, meaning that an ocupied slot of the array represents a process using a resource, or the array could be initially full and extract elements from it representing available resources, etc. Whatever the case is, you as a user would interact with in the same exact way: through its operations `wait` and `signal`.


## Using the examples.

Each folder has one or many implementations of ADTs using Javascript (NodeJS) and a test file. If there is only one implementation of the ADT running the test file will be enough, if there are many implementations then you must edit the file and choose manually the ADT implementation you want to see working.