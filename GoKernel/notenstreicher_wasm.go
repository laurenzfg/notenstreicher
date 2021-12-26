package main

import (
	"encoding/json"
	"fmt"
	"syscall/js"
)

func jsonWrapper() js.Func {
	jsonFunc := js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		if len(args) != 1 {
			return "Invalid no of arguments passed"
		}
		inputJSON := args[0].String()
		fmt.Printf("input %s\n", inputJSON)
		transcript := &Transcript{}

		err := json.Unmarshal([]byte(inputJSON), transcript)
		if err != nil {
			fmt.Printf("unable to process json: %s\n", err)
			return err.Error()
		}
		return solveAndOutput(transcript)
	})
	return jsonFunc
}

func main() {
	fmt.Println("HOWDY THIS IS THE GO KERNEL SPEAKING")
	js.Global().Set("notenstreicher", jsonWrapper())
	<-make(chan bool) // stay alive forever
}
