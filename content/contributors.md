+++
date = '2026-09-01T21:04:11-05:00'
draft = false
title = 'Contributors'
body_class = 'contrib'
custom_css = 'css/contrib.css'
custom_js = 'js/tooltip.js'
[params]
    description = 'All the people who contributed to this project are listed here.'
+++

<div class="square"></div>
<div class="contrib-cloud">
    <div class="cloud-rotator">
        <img src="/images/aliucord.svg">
    </div>
    <div class="o1"></div>
    <div class="o2"></div>
    <div class="o3"></div>
    <div class="o4"></div>
</div>

<script>
    document.querySelector("main > article").className = "";
    function apply(element, index, order, total, group) {
        let cloud_child = document.createElement("div");
        let contrib = document.createElement("img");
        contrib.setAttribute("src", element.avatarUrl);
        cloud_child.insertAdjacentElement("beforeend", contrib);
        cloud_child.setAttribute("class", order);
        cloud_child.setAttribute("data-tooltip", element.username);
        cloud_child.setAttribute("style", `--i: ${index}; --total: ${total}`);
        document.querySelector(group).insertAdjacentElement("beforeend", cloud_child);
    }
    
    fetch("https://raw.githubusercontent.com/Aliucord/Aliucord/builds/contributors.json").then(r => r.json()).then(json => {
        let big_contribs = [];
        let medium_contribs = [];
        let small_contribs = [];
        let tiny_contribs = [];
        for(i=0;i<json.length;i++) {
            if(json[i].commits < 10) {
                tiny_contribs.push(json[i]);
            } else if(json[i].commits < 20) {
                small_contribs.push(json[i]);
            } else if(json[i].commits < 320) {
                medium_contribs.push(json[i]);
            } else big_contribs.push(json[i]);
        }
        big_contribs.forEach((e, i, a) => apply(e, i, "cloud-child orbit1", a.length, ".o1"));
        medium_contribs.forEach((e, i, a) => apply(e, i, "cloud-child orbit2", a.length, ".o2"));
        small_contribs.forEach((e, i, a) => apply(e, i, "cloud-child orbit3", a.length, ".o3"));
        tiny_contribs.forEach((e, i, a) => apply(e, i, "cloud-child orbit4", a.length, ".o4"));
    })
</script>
