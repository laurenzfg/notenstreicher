# Notenstreicher

Notenstreicher is a utility to decide which grades to cancel from your final GPA in the context of the *Streichregel*
of the Computer Science B.Sc. programme of RWTH Aachen university.

In this degree programme, you may cancel at most one course in every focus area from the final GPA.
You may cancel courses to a maximum of 30 ECTS.

Just give this program your full transcript and it will tell you the optimal cancellation decision.
Although the algorithm should be correct, *I do not accept responsibility if the program returns you a non-optimal recommendation*.

## How to invoke the program on my machine?

You can run the app as an command line ap by compiling it for
Linux, Windows or Mac OS X.
To do so, download a Go compiler from the [Go Project](https://go.dev) and invoke the program with

    go run notenstreicher.go

The app was developed and tested with Go 1.16.11 and Linux 5.15.
The `main()` function for CLI purposes is defined in `notensreicher_wasm.go`.

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

## How to invoke the program from JavaScript via WebAssembly?

The algorithm is prepared to be run via WebAssembly (from Javascript).

For compilation, run

    GOOS=js GOARCH=wasm go build -o main.wasm

use `$(go env GOROOT)/misc/wasm/wasm_exec.js` as the loader.

The WASM binary exposes a function `notenstreicher` which takes
a transcript as JSON and returns the same output as the CLI.
The WASM binary is scaffolded and uses the main() defined in `notenstreicher_wasm.go`.

An example for a use from JavaScript is the react app in the root of this repo.

### Sounds cool, where is this WebAssembly stuff documented?

These web pages were of great help:
- https://github.com/golang/go/wiki/webassembly
- https://golangbot.com/webassembly-using-go/
- https://dave.cheney.net/2013/10/12/how-to-use-conditional-compilation-with-the-go-build-tool

The produced binary is rather fat with a size of ~2MB.
But I really didn't care (I am a young programmer),
so I just rolled with it.

[TinyGo](https://tinygo.org/docs/guides/webassembly/) looks promising, but does not have full reflection support.
Hence, we cannot use Go's JSON unmarshaler.
Nonetheless it would be possible to use a third party JSON parser
which works without reflection and get a smaller binary this way.

## How can I modify the program?
I hereby put the software project "notenstreicher" authored by laurenzfg in the last days of 2021 under the MIT License.
See LICENSE file for details.

So feel free to fix and improve the program!
Small changes in the degree programme structure should only require different input,
while fundamental changes to the cancellation logic might require source code changes.

If you have a productive bugfix or feature improvement, create a PR or reach out to me via my [homepage](https://laurenzfg.com).
