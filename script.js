const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];

const loader=$(".loader");

window.addEventListener("load",()=>setTimeout(()=>{
    loader.classList.add("done");
},450));

const header=$(".site-header");

addEventListener("scroll",()=>{
    header.classList.toggle("scrolled",scrollY>30);
},{passive:true});


/* =========================
   MOBILE MENU
========================= */

const menu=$(".menu-toggle");
const mobile=$(".mobile-menu");

menu.addEventListener("click",()=>{
    const open=mobile.classList.toggle("open");

    menu.setAttribute("aria-expanded",open);
    mobile.setAttribute("aria-hidden",!open);
});

$$(".mobile-menu a").forEach(a=>
    a.addEventListener("click",()=>{
        mobile.classList.remove("open");
        menu.setAttribute("aria-expanded","false");
    })
);


/* =========================
   REDUCED MOTION
========================= */

const reduced=matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;


/* =========================
   HERO SCROLL ANIMATION
========================= */

const hero=document.querySelector(".hero");
const heroCopy=$(".hero-copy");
const heroAc=$(".hero-ac-wrap");
const heroH1=$(".hero h1");
const heroLogo=$(".hero-logo");

function clamp(n,a,b){
    return Math.max(a,Math.min(b,n));
}

function heroScroll(){

    if(reduced)return;

    const r=hero.getBoundingClientRect();

    const total=hero.offsetHeight-innerHeight;

    const p=clamp(
        -r.top/total,
        0,
        1
    );

    heroAc.style.transform=
        `translate3d(
            ${p*9-4.5}vw,
            ${p*12-5}vh,
            0
        )
        scale(${.72+p*.62})
        rotate(${p*1.7}deg)`;

    heroAc.style.filter=
        `brightness(${1+p*.1})`;

    heroCopy.style.opacity=
        String(
            clamp(
                1-p*1.45,
                0,
                1
            )
        );

    heroCopy.style.transform=
        `translate3d(
            0,
            ${-p*65}px,
            0
        )`;

    heroLogo.style.opacity=
        String(
            clamp(
                1-p*2,
                0,
                1
            )
        );

    heroH1.style.transform=
        `translate3d(
            0,
            ${-p*35}px,
            0
        )`;
}

addEventListener(
    "scroll",
    heroScroll,
    {passive:true}
);

heroScroll();


/* =========================
   ANIMATED COUNTERS
========================= */

const counters=$$("[data-count]");

const io=new IntersectionObserver(
    es=>es.forEach(e=>{

        if(!e.isIntersecting)return;

        const el=e.target;

        const target=+el.dataset.count;

        const start=performance.now();

        const dur=1200;

        function tick(t){

            const p=Math.min(
                (t-start)/dur,
                1
            );

            el.textContent=
                Math.floor(
                    target*
                    (1-Math.pow(1-p,3))
                )+"+";

            if(p<1){
                requestAnimationFrame(tick);
            }
        }

        requestAnimationFrame(tick);

        io.unobserve(el);
    }),
    {threshold:.5}
);

counters.forEach(c=>io.observe(c));


/* =========================
   TIMELINE ANIMATION
========================= */

const timeline=$(".timeline");

const articles=$$(".timeline article");

const progress=$(".timeline-progress span");

function timelineRun(){

    if(!timeline)return;

    const r=timeline.getBoundingClientRect();

    const p=clamp(
        (innerHeight*.65-r.top)/
        (r.height-innerHeight*.2),
        0,
        1
    );

    progress.style.height=
        (p*100)+"%";

    articles.forEach((a,i)=>{

        a.classList.toggle(
            "active",
            p>(i/(articles.length))
        );

    });
}

addEventListener(
    "scroll",
    timelineRun,
    {passive:true}
);

timelineRun();


/* =========================
   PINNED SERVICES
========================= */

const pin=$(".pinned-services");

const pinAc=$(".pin-ac");

const pinCopy=$(".pin-copy");

const pinNum=$(".pin-number");

const pinTitle=$(".pin-copy h2");

const pinDesc=$(".pin-copy p");

const dots=$(".pin-dots");


const pinData=[

    [
        "01",
        "INSTALLATION",
        "Professional installation with suitable sizing, placement and careful workmanship."
    ],

    [
        "02",
        "MAINTENANCE",
        "Regular maintenance designed to help keep AC systems operating efficiently and extend service life."
    ],

    [
        "03",
        "REPAIR",
        "Fast and reliable repair services for AC systems from major brands."
    ],

    [
        "04",
        "PC BOARD REPAIR",
        "Specialized repair and replacement of AC control boards and electronic components."
    ],

    [
        "05",
        "MOTOR WINDING",
        "Professional motor repair and rewinding services for suitable AC motors."
    ],

    [
        "06",
        "AMC CONTRACTS",
        "Yearly renewable Annual Maintenance Contracts designed to make ongoing AC maintenance easier."
    ]

];


dots.innerHTML=
    pinData.map(
        (_,i)=>
        `<i class="${i===0?"active":""}"></i>`
    ).join("");

const dotEls=$$("i",dots);


function pinnedRun(){

    if(reduced)return;

    const r=pin.getBoundingClientRect();

    const p=clamp(
        -r.top/
        (pin.offsetHeight-innerHeight),
        0,
        1
    );

    const idx=Math.min(
        pinData.length-1,
        Math.floor(
            p*pinData.length
        )
    );

    const d=pinData[idx];

    pinNum.textContent=d[0];

    pinTitle.textContent=d[1];

    pinDesc.textContent=d[2];


    dotEls.forEach(
        (x,i)=>
        x.classList.toggle(
            "active",
            i===idx
        )
    );


    pinAc.style.transform=
        `translate(
            -50%,
            -50%
        )
        translate3d(
            ${Math.sin(p*7)*35}px,
            ${Math.cos(p*5)*18}px,
            0
        )
        scale(${.78+p*.38})
        rotate(${Math.sin(p*5)*1.3}deg)`;


    pinAc.style.filter=
        `brightness(${.9+p*.22})`;
}

addEventListener(
    "scroll",
    pinnedRun,
    {passive:true}
);

pinnedRun();


/* =========================
   RESIDENTIAL / COMMERCIAL
========================= */

const splitPanels=$$(".split-panel");

const splitIO=new IntersectionObserver(
    es=>es.forEach(e=>{

        if(e.isIntersecting){

            e.target.style.transform=
                "translateX(0)";
        }

    }),
    {threshold:.15}
);


splitPanels.forEach(
    (p,i)=>{

        p.style.transform=
            `translateX(
                ${i===0?"-8%":"8%"}
            )`;

        splitIO.observe(p);
    }
);


/* =========================
   GALLERY FILTER BUTTONS
========================= */

const filterBtns=$$(".filters button");

filterBtns.forEach(
    b=>
    b.addEventListener(
        "click",
        ()=>{

            filterBtns.forEach(
                x=>x.classList.remove("active")
            );

            b.classList.add("active");

        }
    )
);


/* =========================
   SMOOTH NAVIGATION
========================= */

$$("a[href^='#']").forEach(
    a=>
    a.addEventListener(
        "click",
        e=>{

            const target=
                $(a.getAttribute("href"));

            if(target){

                e.preventDefault();

                target.scrollIntoView({
                    behavior:
                        reduced
                        ?"auto"
                        :"smooth"
                });

            }

        }
    )
);
