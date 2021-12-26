//+build !wasm

package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	transcript := &Transcript{}

	// "Easter Egg": Invoke the kernel with json as a first and only argument and it reads the full transcript
	// as a JSON one liner according to the unmarshaling traits in the source code above.
	if len(os.Args) == 2 && string(os.Args[1]) == "json" {
		reader := bufio.NewReader(os.Stdin)
		text, _ := reader.ReadBytes('\n')
		err := json.Unmarshal(text, transcript)
		fmt.Printf("Err on JSON umarshal: %v\n", err)
	} else {
		fmt.Println("Notenstreicher reads in a transcript as follows: MutuallyExclusiveGradesGroup name followed by Tricolons Name:ECTS:Grade\nA MutuallyExclusiveGradesGroup is closed with a blank line TODO output this helpstring\nA double blank line finishes input and calculates the grade average")
		subsequentBlankLines := 1
		for subsequentBlankLines < 2 {
			reader := bufio.NewReader(os.Stdin)
			text, _ := reader.ReadString('\n')
			text = strings.ReplaceAll(text, " ", "")
			if text == "\n" {
				subsequentBlankLines++
				continue
			}

			if subsequentBlankLines == 1 {
				// text has to be title of MutuallyExclusiveGradesGroup
				transcript.MEGGs = append(transcript.MEGGs, &MutuallyExclusiveGradesGroup{Name: text[0 : len(text)-1]})
			} else {
				// text has to be title of MutuallyExclusiveGradesGroup Name:ECTS:Grade
				textFields := strings.Split(text, ":")
				if len(textFields) != 3 {
					fmt.Printf("skipping processing of line %v, since it is not of form Name:ECTS:Grade\n", text[0:len(text)-1])
					continue
				}

				name := textFields[0]
				ects, err := strconv.Atoi(textFields[1])
				if err != nil {
					fmt.Printf("skipping processing of line %v, since ECTS is not an int\n", text[0:len(text)-1])
					continue
				}

				gradeString := textFields[2] // has '\n' as last char
				grade, err := strconv.ParseFloat(gradeString[0:len(gradeString)-1], 64)
				if err != nil {
					fmt.Printf("skipping processing of line %v, since grade is not a float\n", text[0:len(text)-1])
					continue
				}

				// Add to transcript
				mostCurrentMEGG := len(transcript.MEGGs) - 1
				transcript.MEGGs[mostCurrentMEGG].Grades = append(transcript.MEGGs[mostCurrentMEGG].Grades,
					&Grade{
						Name: name, Grade: grade, ECTS: ects,
					})
			}
			subsequentBlankLines = 0
		}
	}

	fmt.Print(solveAndOutput(transcript))
}
