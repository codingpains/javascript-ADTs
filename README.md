# Abstract Data Types in Javascript.

## Abstract

This paper recovers concepts from Abstract Data Types (ADTs) and Object Oriented Programming (OOP) previoulsy known as Procedural Data Types (PDT), pointing out the differences, strengths, weaknesses of each one of them and how they can work indiviually and together to create expressive and solid solutions to programming problems. It focuses on Javascript, being a languaje where everything is an object that supports multi-paradigm, mainly object-oriented programming and functional programming.

## Introduction.

The rationale for working in High Level Languages is to make our job as programmers easier, we should be empowered to solve problems in the correct domain without having to go deep into the logic of computers to express our solutions. We can say that we are efficient programmers when we maximize the portion of a program that we can ignore while we are working on other portion. In other words, if we make good abstractions then we can solve problems in a domain that is one layer above of such abstraction making things clearer and easier.

The concepts of OOP have been around since the late 1950s, they were not very popular until the work of Alan Kay and the development of the Smalltalk language brought back to life these concepts and coined the term "object oriented programming", that happened during 1972-76. At that time, the most popular style of programming was the structured programming, it enforces "well structured programs". In 1974 Barbara Liskov and Stephen Zilles presented their paper "Programming With Abstract Data Types" [1], in it they presented a new concept: the Abstract Data Type, and how programmers should use this concept to reduce complexity of a program while improving its correctness and readability.

More than a decade later another good paper was written by William R. Cook called "Object-Oriented Programming versus Abstract Data Types" [2]. In it, he points its differences which are most of the times hard to see, specially when working at high levels of abtraction and makes clear the use cases for both of them we well as their weaknesses and strengths.

## Abstract Data Type.

An Abstract Data Type is formally defined as "a class of abstract objects which is completely characterized by the operations available on those objects" [1]. By reading Cook's ideas, It can inferred a definition that would go somethig like "An ADT is an object defined by its operations" which is basically a re-wording of the formal definition. Cook says that the operations available in any ADT are of two types: constructors and observers. Constructors are the operations that create and/or modify data and the observers are the operations that make possible reading the current state of the data.

In my own words, I would define an ADT as "An invisible set of data that can only be accessed by operations". I think that making explicit that the data is practically invisible is very important, this will force us to think in terms of the operations. The design and implementation of ADT's is strictly focused on its operations giving emphasis to observers and the fact that as a consumer or user of an ADT you will never see the internal data structure, that is where the abstraction magic happens: If the data structure changes, no matter how drastically, all the users of the ADT will not even notice it.

### Strengths of ADTS.
* Allows to ignore implementation details, if the data structure inside the ADT changes we just have modify its use in one place.
* Changes and additions don't affect the whole program, extending the functionality of an ADT or change its behavior does not affect other portions of the program.
* Make the code more readable and self-documenting.
* The program becomes more obvioulsy correct.

	Is a lot easier to know that `currentFont.setBoldOn()` is the operation we want to execute than `currentFont.attribute = 0x02`
	
* You are able to work with representations of real world entities.

	Work with `Students` instead of `StudentsList`or `StudentsTable`. Don't let users know the internal implementation.


## Object-Oriented Programming.

It is mainly represented by the use of classes. Classes are designed around the behaviour and the state of an object, but contrasting with an ADT if you modify the attributes of an object, you can in fact look inside and see them changed. Attributes are usually listed as accessible to the public.

OOP just like its ancestor PDA, is designed around the constructors instread of observers. A good designed class makes use of the ADT concepts to represent real-world objects and solve problems in the right domain.

## Real World Examples of ADTs.

Even when ADT's are concepts of computing, we can have a better understanding by looking at stuff that surrounds us. Every day objects can be seen as ADTs, most of them have an internal functionality and even data that we can not get directly but they provide an interface that we can use to read its data and set new values when we have to.

### Wrist Watch.

A wrist watch is a perfect example of an ADT. Inside it has a complex engine with wheels that we wouldn't be able to understand, however in the outside it gives a nice interface of needles that point at numbers or symbols. If we want to set a new time, it has a useful pin called crown that allows us to do just that.

If instead of having this engine, we had a direct connection to the god Chronos, we wouln't notice.

### Vending Machine.

Imagine a Soda Vending Machine, this machine is sealed and you can not look inside, you have no idea how the bottles are stored inside and what mechanism is there to take your money, grab a soda and deliver it to you. The one and only thing you know about it is how to interact with it through its API.

1. Insert coin.
2. Request Soda.
3. Deliver Soda.
4. Deliver Change.

In the inside the vendor machine can have 5 vertical lanes holding soda bottles, one kind of soda per lane. Or it can have an icebox filled with soda bottles and a magical leprechaun taking the order, selecting the right soda and putting it in the take-out port. Those details remain hidden to you and won't change the way you interact with it.

## Computing examples.

When writting a program we run into many ADTs, for instance an Integer is an ADT, it holds the value of the integer and gives us operations to work with it such as sum and multiply. It´s internal data structure could be binary data and the operation work at that level, or it could be a hexadecimal string, or a scientific notation value, the point is when you are writting the program you use the Integer as an Integer and not as a binary number or whatever it is in the inside.

We can also find semaphores, they are ADTs that can be implemented as a value that can only be changed by using a `wait` operation to get access to a resource or a `signal` operation to release a resource. The inside value could be anything from a boolean, integer, array, string, etc. A boolean semaphore would have a boolean value in the inside that would go to false in the `wait` operation and back to true in the `signal` operation. A counting semaphore could have a number of resources that would decrease when the `wait`operation is called and increase when the `signal` operation is called, or could have an empty array that gets filled when the `wait` operation is called and emptied with the `signal` operation, meaning that an ocupied slot of the array represents a process using a resource, or the array could be initially full and extract elements from it representing available resources, etc. Whatever the case is, you as a user would interact with in the same exact way: through its operations `wait` and `signal`.


## Using the examples.

Each folder has one or many implementations of ADTs using Javascript (NodeJS) and a test file. If there is only one implementation of the ADT running the test file will be enough, if there are many implementations then you must edit the file and choose manually the ADT implementation you want to see working.

## References

[1.] [Programming with Abstract Data Types](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.136.3043&rep=rep1&type=pdf)

[2.] [Object Oriented PRogramming versus Abstract Data Types](http://www.cs.utexas.edu/users/wcook/papers/OOPvsADT/CookOOPvsADT90.pdf)