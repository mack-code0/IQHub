// Button for adding question to question json object
const add_btn = document.querySelector(".add_question")
const editing_question_btn = document.querySelector(".submit_edit_question")


// Holds all the questions in a json formmat/object format
const all_questions_holder = {}

add_btn.addEventListener("click", function(){
    if(!this.id){
        alert("Select a Subject!")
    }else{
        // The id to the current active tab gotten from the id of add_btn
        const question_tab_id  = this.id.split("_")[0]
        
        // Question about to be added
        const main_question = document.querySelector(`#${question_tab_id} .question .question_options textarea`)
        
        // get the correct option
        const get_correct_option = document.querySelectorAll(`#${question_tab_id} .question .question_options div input[type*='radio']`)
        // Options of the question
        let options = document.querySelectorAll(`#${question_tab_id} .question .question_options .options div input[type*='text']`);
        
        // Variable to hold the answer to the question
        let correct_option_holder = ""
        // Array to hold the options after looping through them
        const option_holder = []


        for(let i=0; i<4; i++){
            // Push the value of the options into the option_holder array
            option_holder.push(options[i].value)
            if(get_correct_option[i].checked){
                // Push the value of the checked option to the correct_option_holder variable
                correct_option_holder = get_correct_option[i].value
            }
        }


        // Check if option fields are not empty
        const verify_options = option_holder.findIndex(e=>e.length<1)
        
        
        if(correct_option_holder.length<=0){
            alert("Please select an option")
        }else if(main_question.value.length < 5 || verify_options !== -1){
            alert("Invalid Inputs")
        }else{
            const next_question_number = document.querySelector(`.${question_tab_id}_current_number`)
            // Check if the tab this question belongs to is already in the object holding all the questions
            // If the tab is already present, then update it by pushing the question to the tab it belongs, else create the tab and assign the new question to the tab
            if(all_questions_holder[`${question_tab_id}`]){
                const question_model = {question: main_question.value, options: option_holder}
                all_questions_holder[`${question_tab_id}`].push(question_model)
                // Adding new question to the view
                add_new_question(question_model, all_questions_holder[`${question_tab_id}`].length, question_tab_id)
                next_question_number.innerHTML = `[No. of Questions: ${all_questions_holder[question_tab_id].length}]`
            }else{
                all_questions_holder[`${question_tab_id}`] = [{question: main_question.value, options: option_holder}]
                // Adding new question to the view
                add_new_question(all_questions_holder[`${question_tab_id}`][0], 1, question_tab_id)
                next_question_number.innerHTML = `[No. of Questions: ${all_questions_holder[question_tab_id].length}]`
            }

            // Update the number of questions
            count_questions()

            // Empty the input fields
            main_question.value = ""
            for(let i=0; i<4; i++){
                options[i].value = ""
                get_correct_option[i].checked = false
            }
        }
    }
})



const add_new_question = (question, question_index, question_tab_id)=>{
    const newly_added_question = `<div class="mb-5 w-100 added_questions ${question_tab_id}_qst_${question_index}">
    <div class="d-flex align-items-center mb-3">
        <span class="thick question_index">${question_index}.</span>
        <button onclick="edit_question_btn(this)" class="button green_bg white_txt ms-2 px-2 py-1 edit_question_btn d-flex align-items-center"><i class="bx bx-pencil me-1"></i> Edit</button>
        <button onclick="delete_question_btn(this, '${question_index}')" class="button reddish_bg white_txt ms-2 px-2 py-1 delete_question_btn d-flex align-items-center"><i class="bx bx-trash me-1"></i> Delete</button>
    </div>
        <h6 class="thick added_question mt-2">${question.question}</h6>
        <div class="d-flex added_question_options flex-wrap">
            <div class="w-50 mb-1 pe-3">
                <span class="thick">A.</span>
                <h6 class="less_thick">${question.options[0]}</h6>
            </div>
            <div class="w-50 mb-1 ps-3">
                <span class="thick">C.</span>
                <h6 class="less_thick">${question.options[1]}</h6>
            </div>
            <div class="w-50 mt-1 pe-3">
                <span class="thick">B.</span>
                <h6 class="less_thick">${question.options[2]}</h6>
            </div>
            <div class="w-50 mt-1 ps-3">
                <span class="thick">D.</span>
                <h6 class="less_thick">${question.options[3]}</h6>
            </div>
        </div>
    </div>`

    editing_question_btn.setAttribute("disabled", "true")
    editing_question_btn.setAttribute("onclick", "")
    $(`#${question_tab_id}`).append(newly_added_question);
}





const edit_question_btn = (e)=>{
    const tab_section_to_edit = e.parentElement.parentElement.parentElement.getAttribute("id")
    // Question about to be added
    const question_to_edit = document.querySelector(`#${tab_section_to_edit} .question .question_options textarea`)
     // Options of the question
    const options_to_edit = document.querySelectorAll(`#${tab_section_to_edit} .question .question_options .options div input[type*='text']`);
    
    question_to_edit.value = e.parentElement.parentElement.querySelector(".added_question").innerHTML
    options_to_edit.forEach((op, opIndex)=>{
        op.value = e.parentElement.parentElement.querySelectorAll(".added_question_options h6")[opIndex].innerHTML
    })
    // Question Index
    const question_index = e.parentElement.parentElement.querySelector("div .question_index").innerHTML.replace(".", "")
    editing_question_btn.setAttribute("onclick", `submit_edited_question('${tab_section_to_edit}_q_${question_index}', this)`)
    editing_question_btn.removeAttribute("disabled")
    document.querySelector(`#${tab_section_to_edit} .question_edit_mode`).value = `true_${question_index}`
}


const submit_edited_question = function(e){
    // console.log(this.id);
    const questionTabId = e.split("_")

    // Question about to be added
    const main_question = document.querySelector(`#${questionTabId[0]} .question .question_options textarea`)

    // Options of the question
    const options = document.querySelectorAll(`#${questionTabId[0]} .question .question_options .options div input[type*='text']`);
    const option_holder = []
    options.forEach(inp=>{
        option_holder.push(inp.value)
    })

    all_questions_holder[questionTabId[0]][questionTabId[2]-1] = {
        question: main_question.value,
        options: option_holder
    }

    document.querySelector(`.${questionTabId[0]}_qst_${questionTabId[2]} .added_question`).innerHTML = main_question.value
    document.querySelectorAll(`.${questionTabId[0]}_qst_${questionTabId[2]} .added_question_options h6`).forEach((inp, index)=>{
        inp.innerHTML = option_holder[index]
    })
    
    main_question.value = ""
    options.forEach(inp=>{
        inp.value = ""
    })

    editing_question_btn.setAttribute("disabled", "true")
    editing_question_btn.setAttribute("onclick", "")
    document.querySelector(`#${questionTabId[0]} .question_edit_mode`).value = "false"
}



const delete_question_btn = (e, q_index)=>{
    const tab_section_to_edit = e.parentElement.parentElement.parentElement.getAttribute("id")
    const newArrayOfQuestions = all_questions_holder[tab_section_to_edit].filter((el, index)=>{
        return index+1 != q_index
    })

    all_questions_holder[tab_section_to_edit] = [...newArrayOfQuestions]
    document.querySelectorAll(`#${tab_section_to_edit} .added_questions`).forEach(e=>{
        e.remove()
    })
    all_questions_holder[tab_section_to_edit].forEach((question, index)=>{
        add_new_question(question, index+1, tab_section_to_edit)
    })

    count_questions()

    editing_question_btn.setAttribute("disabled", "true")
    editing_question_btn.setAttribute("onclick", "")
}



const count_questions = ()=>{
    let total_question_numbers = 0
    for(const key in all_questions_holder){
        total_question_numbers += all_questions_holder[key].length
        document.querySelector(".total_questions span").innerHTML  = total_question_numbers
    }
}



const checkErrors = (theId, cb)=>{
    // The id to the current active tab gotten from the id of add_btn
    const question_tab_id  = theId.split("_")[0]
        
    // Question about to be added
    const main_question = document.querySelector(`#${question_tab_id} .question .question_options textarea`)
    
    // get the correct option
    const get_correct_option = document.querySelectorAll(`#${question_tab_id} .question .question_options div input[type*='radio']`)
    // Options of the question
    let options = document.querySelectorAll(`#${question_tab_id} .question .question_options .options div input[type*='text']`);
    
    // Variable to hold the answer to the question
    let correct_option_holder = ""
    // Array to hold the options after looping through them
    const option_holder = []


    for(let i=0; i<4; i++){
        // Push the value of the options into the option_holder array
        option_holder.push(options[i].value)
        if(get_correct_option[i].checked){
            // Push the value of the checked option to the correct_option_holder variable
            correct_option_holder = get_correct_option[i].value
        }
    }

    // Check if option fields are not empty
    const verify_options = option_holder.findIndex(e=>e.length<1)

    if(correct_option_holder.length<=0){
        cb({msg: "Select an Option"}, {})
    }else if(main_question.value.length < 5 || verify_options !== -1){
        cb({msg: "Invalid Inputs"}, {})
    }else{
        cb({msg: ""}, {
            question_tab_id,
            question: main_question.value,
            options: option_holder,
            correct_option: correct_option_holder 
        })
    }

}