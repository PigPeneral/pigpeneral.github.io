/* 這個js專用於設計給 index.html 入口 Hello World動畫相關的腳本 */

let skipCurrentDelay = null;
let animationComplete = false;

function delay(milliseconds) {
    return new Promise(resolve => {
        const timer = setTimeout(resolve, milliseconds);
        skipCurrentDelay = () => {
            clearTimeout(timer);
            resolve();
        };
    });
}

const useCount = function () {
    let count = 0;
    const countButton = document.getElementById("countButton");

    countButton.addEventListener("click", async () => {
        count += 1;
        /* for debug */
        console.log("Clicked, count =", count);
        /* --------- */
        document.getElementById("countDisplay").textContent = count;
        if (skipCurrentDelay) {
            skipCurrentDelay();
        }
        if (animationComplete) {
            const letterElements = document.querySelectorAll(".hw-letter");
            animationComplete = false;
            count = 0;
            document.getElementById("countDisplay").textContent = count;
            for (const elements of letterElements) {
                elements.classList.remove("hw-letter--visible");
                await delay(300);
            }
            await hwAnimate();
            console.log("hwAnimate completed");
        }
    });
};

const hwAnimate = async function () {
    const letterElements = document.querySelectorAll(".hw-letter");
    for (const [index, letterElement] of letterElements.entries()) {
        await delay(300);
        /* for debug */
        console.log(index, letterElement.textContent);
        /* --------- */
        letterElement.classList.add("hw-letter--visible");
    }
    animationComplete = true;
};

useCount();
hwAnimate().then(() => {
    console.log("hwAnimate completed");
});