package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

var maxECTSCancel = 30

// Every Grade and every MutuallyExclusiveGradesGroup is uniquely identified by its' name

type Transcript struct {
	MEGGs []*MutuallyExclusiveGradesGroup `json:"meggs"`
}

type MutuallyExclusiveGradesGroup struct {
	Name   string   `json:"name"`
	Grades []*Grade `json:"grades"`
}

type Grade struct {
	Name  string  `json:"name"`
	Grade float64 `json:"grade"`
	ECTS  int     `json:"ects"`
}

func (tr *Transcript) avg() float64 {
	meggCount := len(tr.MEGGs)

	// Ignore no grades:
	noopIgnoreList := make([]int, meggCount)
	for i, _ := range noopIgnoreList {
		noopIgnoreList[i] = -1
	}

	return tr.avgWithIgnoreList(noopIgnoreList)
}

// This calculates the average, but ignoring at most one grade per MEGG
// So iff ignoreList[i] = j, the jth grade in the 1st MEGG is ignored in
// the average calculation.
// If you want to include a full MEGG in the average calculation, set ignoreList[i] = -1
func (tr *Transcript) avgWithIgnoreList(ignoreList []int) float64 {
	// Assert ignoreList is in the correct shape
	if len(ignoreList) != len(tr.MEGGs) {
		fmt.Println("WARN: ignore list is of wrong shape")
		return 6.0
	}

	sum := 0.0
	ectsSum := 0.0

	for i, megg := range tr.MEGGs {
		for j, grade := range megg.Grades {
			if ignoreList[i] == j {
				// Skip cancelled grades in avg calculation
				continue
			}
			ectsAsFloat := float64(grade.ECTS) // to avoid unwanted int converts
			sum += grade.Grade * ectsAsFloat
			ectsSum += ectsAsFloat
		}
	}

	if ectsSum == 0.0 {
		// Blank transcript ==> return 6.0 as fallback value
		return 6.0
	}
	return sum / ectsSum
}

func (tr *Transcript) findOptimalIgnoreList() (optimalIgnoreList []int, optimalAVG float64) {
	// Start the recursion with the appropriate ectsLimit, an all -1 ignoreListSoFar and curPos=0
	initialIgnoreList := make([]int, len(tr.MEGGs))
	for i, _ := range initialIgnoreList {
		initialIgnoreList[i] = -1
	}

	return tr.findOptimalIgnoreListRecursion(initialIgnoreList, maxECTSCancel, 0)
}

// Start the recursion with the appropriate ectsLimit, an all -1 ignoreListSoFar and curPos=0
// Solves the optimisation problem by doing a full Depth-First-Search
func (tr *Transcript) findOptimalIgnoreListRecursion(ignoreListSoFar []int, ectsLimit int, curPos int) (optimalIgnoreList []int, optimalAVG float64) {
	// We cannot recurse any further if we have no ECTS to cancel left or arrived at the last MEGG
	if ectsLimit < 1 || curPos == len(ignoreListSoFar) {
		return ignoreListSoFar, tr.avgWithIgnoreList(ignoreListSoFar)
	}

	// We go down the tree and evaluate to
	// a) not cancel anything in the MEGG curPos
	// b) cancel a grade in the MEGG curPos
	// Set a) is the initial value for the returned maximum
	optimalIgnoreList = make([]int, len(tr.MEGGs))
	copy(optimalIgnoreList, ignoreListSoFar)
	optimalIgnoreList, optimalAVG = tr.findOptimalIgnoreListRecursion(optimalIgnoreList, ectsLimit, curPos+1)

	for i := 0; i < len(tr.MEGGs[curPos].Grades); i++ {
		evaluatedIgnoreList := make([]int, len(tr.MEGGs))
		copy(evaluatedIgnoreList, ignoreListSoFar)
		// Set grade i as ignored
		evaluatedIgnoreList[curPos] = i
		nextEctsLimit := ectsLimit - tr.MEGGs[curPos].Grades[i].ECTS
		// if we have cancelled more than ECTS available, skip this cancellation
		if nextEctsLimit < 0 {
			continue
		}

		evaluatedIgnoreList, evaluatedAVG := tr.findOptimalIgnoreListRecursion(evaluatedIgnoreList, nextEctsLimit, curPos+1)

		if evaluatedAVG < optimalAVG {
			optimalAVG = evaluatedAVG
			optimalIgnoreList = evaluatedIgnoreList
		}
	}

	return
}

func solveAndOutput(transcript *Transcript) string {
	output := ""
	output += fmt.Sprintf("your naïve average grade would be: %f\n", transcript.avg())
	output += fmt.Sprintln("Solving the optimisation problem")
	optimalIgnoreList, optimalAvg := transcript.findOptimalIgnoreList()
	output += fmt.Sprintln("It is optimal to cancel the following grades:")
	for meggI, j := range optimalIgnoreList {
		meggName := transcript.MEGGs[meggI].Name
		if j == -1 {
			output += fmt.Sprintf("Don't cancel any grade in MEGG %s\n", meggName)
		} else {
			gradeName := transcript.MEGGs[meggI].Grades[j].Name
			output += fmt.Sprintf("In MEGG %s, cancel %s\n", meggName, gradeName)
		}
	}
	output += fmt.Sprintf("\nThis cancellation yields an average of: %f\n", optimalAvg)
	output += fmt.Sprintf("\nlaurenzfg congratelates you to your successful CS degree.\nlaurenzfg does not take any responsibility for the grade cancellation recommodation.\nSolve the problem yourself, you literally have a CS degree now!\nArrivederci!\n")

	return output
}

func main() {
	transcript := &Transcript{}

	// "Easter Egg": Invoke the kernel with json as a first and only argument and it reads the full transcript as one JSON according
	// to the unmarshaling traits in the source code above
	if len(os.Args) == 2 && string(os.Args[1]) == "json" {
		return
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
