export const roles = [
    {
        id: 1,
        name: "werewolf",
        team: "wolves",
        isNightRole: true,
        description:
            "Each night, choose a player to kill. Choice has to be unanimous.",
        color: "danger",
        image: "",
    },
    {
        id: 2,
        name: "wolf cub",
        team: "wolves",
        isNightRole: true,
        description:
            "If the wolf cub dies, the wolves can choose 2 players to eliminate the next night.",
        color: "danger",
        image: "",
    },
    {
        id: 3,
        name: "wolf man",
        team: "wolves",
        isNightRole: true,
        description:
            "All roles that detect wolves see the Wolf Man has a villager.",
        color: "danger",
        image: "",
    },
    {
        id: 4,
        name: "minion",
        team: "wolves",
        isNightRole: false,
        description:
            "Learns which players are on the wolf team the 1st night. The wolves do not learn who the Minion is. Seen as a villager by detection roles.",
        color: "warning",
        image: "",
    },
    {
        id: 5,
        name: "lycan",
        team: "village",
        isNightRole: false,
        description: "All roles that detect wolves see the Lycan as a wolf.",
        color: "warning",
        image: "",
    },
    {
        id: 6,
        name: "seer",
        team: "village",
        isNightRole: true,
        description:
            "Each night, points to a player to learn if they are a wolf.",
        color: "info",
        image: "",
    },
    {
        id: 7,
        name: "apprentice seer",
        team: "village",
        isNightRole: true,
        description:
            "Each night, points to a player to learn if they are a wolf, but should only be given a response after the seer has died.",
        color: "info",
        image: "",
    },
    {
        id: 8,
        name: "hunter",
        team: "village",
        isNightRole: false,
        description:
            "When the hunter dies, they may eliminate any other player.",
        color: "info",
        image: "",
    },
    {
        id: 9,
        name: "witch",
        team: "village",
        isNightRole: true,
        description:
            "Learns who was killed that night. The witch may save 1 of the targets or choose to eliminate a new player. One use only.",
        color: "info",
        image: "",
    },
    {
        id: 10,
        name: "priest",
        team: "village",
        isNightRole: true,
        description:
            "Each night, is asked to choose a player to protect. Can't choose themselves. If the priest is eliminate, the player that was given their blessing stays protected. One use only.",
        color: "info",
        image: "",
    },
    {
        id: 11,
        name: "villager",
        team: "village",
        isNightRole: false,
        description: "No special abilities.",
        color: "light",
        image: "",
    },
];
