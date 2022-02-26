let addSubjectBtn = document.querySelector(".add_subject .button")
let subject_name = document.querySelector(".add_subject input")




addSubjectBtn.addEventListener("click", ()=>{
    let real_subject_name = subject_name.value.replace(/\s/g, "")
    var htm = `<button class="button dark_bg white_txt px-2 py-1 me-2 d-flex align-items-center"><i class="bx bx-trash me-1"></i>
    <a onclick="clickedSubjectName(this)" data-bs-toggle="collapse"  href="#${real_subject_name}id" role="button" aria-expanded="false" aria-controls="${real_subject_name}id">${subject_name.value}</a>
</button>`
	$(".exam_subject_names").append(htm);

    var newHtml = `<div id="${real_subject_name}id" class="form_1 w-100 mt-5 collapse multi-collapse">
    <h6 class="thick mb-4">${subject_name.value}</h6>
    <div class="question mb-5 w-100">
        <h6 class="thick me-3">1.</h6>
        <div class="question_options w-100">
            <textarea name="" id="${real_subject_name}id_main_question" class="w-100 mb-2" rows="4"></textarea>
            <div class="options w-100 d-flex flex-wrap">
                <div class="w-50 mb-2 pe-3">
                    <label class="thick" for="option_a">A.</label>
                    <input type="text" id="option_a" class="w-100 ${real_subject_name}id_options">
                </div>
                <div class="w-50 mb-2 ps-3">
                    <label class="thick" for="option_c">C.</label>
                    <input type="text" id="option_c" class="w-100 ${real_subject_name}id_options">
                </div>
                <div class="w-50 mt-2 pe-3">
                    <label class="thick" for="option_b">B.</label>
                    <input type="text" id="option_b" class="w-100 ${real_subject_name}id_options">
                </div>
                <div class="w-50 mt-2 ps-3">
                    <label class="thick" for="option_d">D.</label>
                    <input type="text" id="option_d" class="w-100 ${real_subject_name}id_options">
                </div>
            </div>
        </div>
    </div>
</div>`

    $(".all_question_to_add").append(newHtml);
    subject_name.value = ""
})


let clickedSubjectName = (m)=>{
    document.querySelector(".add_question").setAttribute("id", `${m.getAttribute("href").substring(1)}`)
    let subject_name_btn_array = document.querySelectorAll(".exam_subject_names button a")
    let all_question_to_add_array = document.querySelector(".all_question_to_add").childNodes
    for(let i = 0; i<subject_name_btn_array.length; i++){
        if(subject_name_btn_array[i].getAttribute("href").substring(1) !== m.getAttribute("href").substring(1)){
            subject_name_btn_array[i].setAttribute("aria-expanded", "false");
            subject_name_btn_array[i].setAttribute("class", "collapsed");
            all_question_to_add_array[i].classList.remove("show")
        }
    }
}