# Notenstreicher

Notenstreicher is a utility to decide which grades to cancel from your final GPA in the context of the *Streichregel*
of the Computer Science B.Sc. programme of RWTH Aachen university.

In this degree programme, you may cancel at most one course in every focus area from the final GPA.
You may cancel courses to a maximum of 30 ECTS.

Just give this program your full transcript and it will tell you the optimal cancellation decision.
Although the algorithm should be correct, *I do not accept responsibility if the program returns you a non-optimal recommendation*.

## How to invoke the program?

Download a Go runtime from the [Go Project](https://go.dev) and invoke the program with

    go run notenstreicher.go

Insert your transcript except for the Bachelor Thesis (it can not be canceled) in the following format:
* Every block starts with the name of focus area (e.g Practical CS)
* All grades in a block are given in the format 'Name:ECTS:Grade' e.g. (Programming:8:1.3)
* Blocks are terminated with a single blank line
* Spaces are ignored; The input must not contain tabs or colons except where specified
* Input is terminated with a double blank line

An example input:

    Praktische Informatik
    Programmierung:8:2.0
    DSAL:8:2.0
    Datenbanken:6:2.0
    SWT:6:2.0

    Technische Informatik
    TI:6:2.0
    BUS:6:2.0
    Datkom:6:2.0

    Theoretische Informatik
    Fosap:6:2.0
    BuK:7:2.0
    Malo:7:4.0

    Mathematik
    DS:6:2.0
    AfI:8:2.0
    LA:6:2.0
    Stocha:6:2.0

    Sonstiges
    Proseminar:3:2.0
    Praktikum:6:2.0
    Seminar:5:2.0

    Wahlpflicht
    DPN:6:2.0
    AI:6:2.0
    Compilerbau:6:2.0

    Anwendungsfach
    NumA1:6:2.0
    Mathe Praktikum:6:2.0
    Cobra:10:2.0

## How can I modify the program?
I hereby put the software project "notenstreicher" authored by laurenzfg in the last days of 2021 under the MIT License.
See LICENSE file for details.

So feel free to fix and improve the program!
Small changes in the degree programme structure should only require different input,
while fundamental changes to the cancellation logic might require source code changes.

If you have a productive bugfix or feature improvement, create a PR or reach out to me via my [homepage](https://laurenzfg.com)
