function find_text(base, search, start_pos=0) {
    if (search.length > base.length) return ["", -1];
    let output = "";
    let i = 0;
    let base_count = start_pos;
    for (const char of base.slice(start_pos)) {
        base_count++;
        if (char === search[i]) {
            output += char;
            i++;
            if (i === search.length)
                return [output, base_count];
        } else {
            output += " ";
        }   
    }
    return [output, base_count];
}

function valid_section(word, section) {
    return section.replace(/\s/g, "") === word.replace(/\s/g, "");
}

function search_sentence(base, sentence) {
    let result = [""];
    let point = 0;
    let words = sentence.split(" ");
    let word = words.shift()
    let second_attempt = false; let section;
    while (word) {
        [section, point] = find_text(base, word, point);
        if (valid_section(word, section)) {
            result[result.length-1] += section;
            word = words.shift();
            second_attempt = false;
        } else {
            if (!second_attempt) {
                second_attempt = true;
                point = 0;
                result.push("");
            } else {
                return [];
            }
        }
    }
    return result;
}
let result;
document.getElementById("search").addEventListener("click", function() {
    let base_text = document.getElementById("base_text").value;
    let search_text = document.getElementById("search_text").value;
    base_text = base_text.toLowerCase();
    search_text = search_text.toLowerCase();
    result = search_sentence(base_text, search_text)

    let original = document.createElement("p");
    original.innerText = base_text;
    document.getElementsByClassName("input")[0].appendChild(original);

    for (const sentence of result) {
        let p = document.createElement("p");
        p.innerHTML = sentence;
        p.className = "monospace";
        document.getElementsByClassName("parts")[0].appendChild(p);
    }
});
