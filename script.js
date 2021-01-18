const containerEl = document.querySelector(".container");
const seatInfoEl = document.querySelector(".place__seat-info");

const range = (from, to) => {
    const list = [];
    for (let item = from; item <= to; item++) {
        list.push(item);
    }
    return list;
};

const getEl = (count, props = {}) => {
    return range(1, count).map((num) => {
        const el = document.createElement("div");
        el.classList.add(...props.classList);
        el.dataset[props.datasetName] = num;

        if (props.innerEl) {
            el.append(...props.innerEl.map((el) => el.cloneNode(true)));
        }

        return el;
    });
};

const getSeats = (count) => {
    const props = {
        classList: ["seat"],
        datasetName: "seatNumber",
    };
    return getEl(count, props);
};

const getLines = (count) => {
    const props = {
        classList: ["line"],
        datasetName: "lineNumber",
        innerEl: [...getSeats(10)],
    };
    return getEl(count, props);
};

const getSectors = (count) => {
    const props = {
        classList: ["sector"],
        datasetName: "sectorNumber",
        innerEl: [...getLines(10)],
    };
    return getEl(count, props);
};

const renderArena = () => {
    containerEl.append(...getSectors(3));
};

renderArena();

const getInfoAboutSeat = ({ target }) => {
    const { seatNumber } = target.dataset;
    if (!seatNumber) return;
    const { lineNumber } = target.closest(".line").dataset;
    const { sectorNumber } = target.closest(".sector").dataset;
    seatInfoEl.innerHTML = `S: ${sectorNumber} L: ${lineNumber} S: ${seatNumber}`;
};

containerEl.addEventListener("click", getInfoAboutSeat);
