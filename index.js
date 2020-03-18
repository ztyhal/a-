const headerEl = document.querySelector("header");
const scrollToTop = document.querySelector(".scrollToTop");

window.addEventListener("scroll", () => {
    let height = headerEl.getBoundingClientRect().height;
    if (window.pageYOffset - height > 800) {
        if (!headerEl.classList.contains("sticky")) {
            headerEl.classList.add("sticky");
        }
    } else {
        headerEl.classList.remove("sticky")
    }
    if(window.pageYOffset>2000){
        scrollToTop.style.display = "block";
    }else{
        scrollToTop.style.display = "none";
    }
})

const glide = new Glide(".glide");
const captionsEL = document.querySelectorAll(".slide-caption");

glide.on(["mount.after", "run.after"], () => {
    const caption = captionsEL[glide.index];
    anime({
        targets: caption.children,
        opacity: [0, 1],
        duration: 400,
        easing: "linear",
        delay: anime.stagger(400, {
            start: 300
        }),
        translateY: [anime.stagger([40, 10]), 0]
    });
});
glide.on("run.before", () => {
    document.querySelectorAll(".slide-caption>*").forEach(el => {
        el.style.opacity = 0;
    });
});
glide.mount();
// 成功案例
const isotope = new Isotope(".cases", {
    layoutMode: "fitRows",
    itemSelector: ".case-item"
});

const filterBtns = document.querySelector(".filter-btns");

filterBtns.addEventListener("click", e => {
    let {
        target
    } = e;
    const filterOption = target.getAttribute("data-filter");
    if (filterOption) {
        document.querySelectorAll(".filter-btn.active").forEach(btn => btn.classList.remove("active"));
        target.classList.add("active");

        isotope.arrange({
            filter: filterOption
        });
    }
}); 

// 滑动展示
const seaggeringOption = {
    delay:300,
    distance:"50px",
    duration:500,
    easing:"ease-in-out",
    origin:"bottom"
}
ScrollReveal().reveal(".feature",{...seaggeringOption,interval:350});
ScrollReveal().reveal(".service-item",{...seaggeringOption,interval:350});

// 数字变化
const dataSectionEl = document.querySelector(".data-section");
ScrollReveal().reveal(".data-section",{
    beforeReveal:()=>{
        anime({
            targets:".data-piece .num",
            innerHTML: el=>{
                return [0,el.innerHTML];
            },
            duration:2000,
            round:1,
            easing:"easeInExpo"
        });
        dataSectionEl.style.backgroundPositon = ` center calc(50% - ${dataSectionEl.getBoundingClientRect().bottom/5}px)`;
    }
});

window.addEventListener("scroll",() =>{
    const bottom = dataSectionEl.getBoundingClientRect().bottom;
    const  top = dataSectionEl.getBoundingClientRect().top;

    if(bottom>=0&&top<=window.innerHeight){
        dataSectionEl.style.backgroundPositon = ` center calc(50% - ${bottom/5}px)`;
    }
})