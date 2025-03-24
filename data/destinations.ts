export interface DestinationType {
    id: number;
    title: string;
    country: string;
    image: string;
    audio: string;
}

export interface DestinationType2 {
    id: number;
    name: string;
    description: string;
}

export const DESTINATION_DATA: DestinationType[] = [
    {
        id: 1,
        title: "Berlin",
        country: "Germany",
        image: "trees.webp",
        audio: "trees.mp3",
    },
    {
        id: 2,
        title: "Paris",
        country: "France",
        image: "river.webp",
        audio: "river.mp3",
    },
    {
        id: 3,
        title: "Prague",
        country: "Czech Republic",
        image: "meditate-under-tree.webp",
        audio: "meditate-under-tree.mp3",
    },
    {
        id: 4,
        title: "Madrid",
        country: "Spain",
        image: "beach.webp",
        audio: "beach.mp3",
    },
    {
        id: 5,
        title: "Moscow",
        country: "Russia",
        image: "yosemite-stars.webp",
        audio: "yosemite-stars.mp3",
    },
    {
        id: 6,
        title: "Rome",
        country: "Italy",
        image: "waterfall.webp",
        audio: "waterfall.mp3",
    },
    {
        id: 7,
        title: "Beijing",
        country: "China",
        image: "waterfall.webp",
        audio: "waterfall.mp3",
    },
    {
        id: 8,
        title: "Seoul",
        country: "South Korea",
        image: "waterfall.webp",
        audio: "waterfall.mp3",
    },
];