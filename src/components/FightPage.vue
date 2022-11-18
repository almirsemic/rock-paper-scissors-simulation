<template>
    <div>
        <div v-if="!fail" class="d-flex justify-content-center align-items-center vh-100">
            <div class="w-75 h-75">
                <div class="row text-center">
                    <div class="col-sm-12">
                        <h5 class="text-warning fs-1 fw-bold">PAKIPAKI</h5>
                    </div>
                </div>
                <div class="row justify-content-center mt-5">
                    <div class="col-sm-5 col-lg-4 text-center">
                        <p class="text-warning fw-bold fs-5">{{ fighterOneName.toUpperCase() }}</p>
                        <img :src="require('../assets/avatar_' + fighterOneImg + '.jpg')" class="rounded-circle"
                            @click="openModal"
                            :class="{ winner: winnerOne > winnerTwo, drawn: (winnerOne == winnerTwo && endGame) }">
                        <p v-if="winnerOne > winnerTwo" class="fw-bold winner_text">WINNER</p>
                        <p v-if="(winnerOne == winnerTwo && endGame)" class="fw-bold text-warning">DRAWN</p>
                    </div>
                    <div class="col-sm-2 col-lg-1 d-flex align-items-center justify-content-center">
                        <h3 class="text-warning">VS</h3>
                    </div>
                    <div class="col-sm-5 col-lg-4 text-center">
                        <p v-if="fighterTwo" class="text-warning fw-bold fs-5">{{ fighterTwo.Name.toUpperCase() }}</p>
                        <p v-else class="text-warning fw-bold fs-5">{{ fighterTwoImg.toUpperCase() }}</p>
                        <img :src="require('../assets/avatar_' + fighterTwoImg + '.jpg')" @click="openModal" :class="{
                            winner: winnerOne < winnerTwo, waiting_opponent: fighterTwoImg == 'unknown',
                            drawn: (winnerOne == winnerTwo && endGame)
                        }" class="rounded-circle">
                        <p v-if="winnerOne < winnerTwo" class="fw-bold winner_text">WINNER</p>
                        <p v-if="(winnerOne == winnerTwo && endGame)" class="fw-bold text-warning">DRAWN</p>
                    </div>
                </div>
                <div v-if="endGame" class="row text-center mt-5">
                    <p class="fs-5 logs" v-for="(i, index) in attackFighterTwo" :key="index">{{ index + 1 }}.
                        <strong
                            :class="{ round_winner: rounds[index] == 1, round_loser_or_drawn: rounds[index] == 2 || rounds[index] == 0 }">
                            {{ attackFighterOne[index] }}</strong> - <strong :class="{round_winner: rounds[index] == 2,
                                round_loser_or_drawn: rounds[index] == 1 || rounds[index] == 0}">{{ i }}
                        </strong>
                    </p>
                </div>
                <div v-if="!endGame" class="row justify-content-center mt-5">
                    <div class="col-xl-6 col-sm-9 col-lg-7 p-4 text-center notification">
                        <h5 v-if="textShow" class="text-light fw-bold">WAITING FOR 2ND PLAYER TO JOIN...</h5>
                        <h5 v-if="!textShow && fighterTwoImg" class="text-light fw-bold">BEATING THE SHIT OUT OF"{{
                                fighterTwo.Name
                        }}"</h5>
                    </div>
                </div>
                <div class="row p-4">
                    <div class="text-center">
                        <button @click="cancel" class="btn btn-warning px-4 text-danger fw-bold">{{ textButton
                        }}</button>
                    </div>
                </div>
            </div>
            <b-modal id="modal-2" title="Message" header-class="message" content-class="content" hide-footer>
                <p class="my-4 fw-bold">{{ message }}</p>
            </b-modal>
            <b-modal id="modal-1" title="Error" header-class="error" content-class="content" hide-footer>
                <p class="my-4 fw-bold text-danger">{{ errorMessage }}</p>
            </b-modal>
        </div>
        <AnimationLoader v-if="fail" />
    </div>
</template>
<script>
import axios from 'axios'
import AnimationLoader from './AnimationLoader.vue'
function imagePath(num) {
    switch (num) {
        case 0:
            return 'marvin'
        case 1:
            return 'dragon'
        case 2:
            return 'tesla'
        case 3:
            return 'hackerman'
        case 4:
            return 'unicorn'
        default:
            return undefined
    }
}
function fighterSetAttack(str1, str2, str3, attacks) {
    let array = []
    let i = 0
    while (i < 3) {
        if (attacks[i] == 0) {
            array.push(str1)
        } else if (attacks[i] == 1) {
            array.push(str2)
        } else if (attacks[i] == 2) {
            array.push(str3)
        }
        i++
    }
    return array
}
function fighterAttack(warriorType, attacks) {
    switch (warriorType) {
        case 0:
            return fighterSetAttack('Depression #1', 'Depression #2', 'Depression #3', attacks)
        case 1:
            return fighterSetAttack('Fire-Spitting', 'Dragon-Claw', 'Pound', attacks)
        case 2:
            return fighterSetAttack('Shaker-Machine', 'AC voltage', 'Radio Waves', attacks)
        case 3:
            return fighterSetAttack('Cyber', 'System32 Error', 'Norton Antivirus', attacks)
        case 4:
            return fighterSetAttack('Rainbowshit', 'Candypuke', 'Cornlove', attacks)
        default:
            return []
    }
}
export default {
    components: {
        AnimationLoader
    },
    data() {
        return {
            fighterOneImg: localStorage.getItem("selectedWarrior"),
            fighterOneName: localStorage.getItem("name"),
            fighterOne: null,
            fighterTwo: null,
            fighterTwoImg: 'unknown',
            textButton: 'PANIC !!!',
            startGame: true,
            textShow: true,
            endGame: false,
            errorMessage: '',
            message: '',
            rounds: [],
            winnerOne: 0,
            winnerTwo: 0,
            fail: false
        }
    },
    computed: {
        attackFighterOne() {
            return fighterAttack(this.fighterOne.WarriorType, this.fighterOne.Attacks)
        },
        attackFighterTwo() {
            return fighterAttack(this.fighterTwo.WarriorType, this.fighterTwo.Attacks)
        }
    },
    methods: {
        openModal() {
            if (this.endGame) {
                this.$bvModal.show("modal-2")
            }
        },
        async cancel() {
            try {
                if (this.textButton == 'PANIC !!!') {   
            // On one click it remains on pending, while on the other it works
                    const CANCEL = await axios.post("", {
                        "jsonrpc": "2.0",
                        "id": 1,
                        "method": "Cancel",
                        "params": {
                            "id": localStorage.getItem("id")
                        }
                    })
                    if (CANCEL.data.error.data.message !== "fight must be in waiting status to be deleted") {
                        this.startGame = false
                        localStorage.clear()
                        this.$router.replace("/")
                    } else {
                        this.errorMessage = CANCEL.data.error.data.message
                        this.$bvModal.show("modal-1")
                    }
                } else if (this.textButton == "SURRENDER !!!") {
                    this.message = "I'm sorry, you can't surrender. You will be dead."
                    this.$bvModal.show("modal-2")
                } else if (this.textButton == "AGAIN !!!") {
                    localStorage.clear()
                    this.$router.replace("/")
                }
            } catch (error) {
                console.error(error)
            }
        },
        async fight() {
            try {
                const STATUS = await axios.post("", {
                    "jsonrpc": "2.0",
                    "id": 1,
                    "method": "Status",
                    "params": {
                        "id": localStorage.getItem("id")
                    }
                })
                this.fighterOne = STATUS.data.result.fight.Warrior1
                this.fighterTwo = STATUS.data.result.fight.Warrior2
                this.fighterTwoImg = imagePath(this.fighterTwo.WarriorType)
                this.textButton = "SURRENDER !!!"
                this.textShow = false
                setTimeout(() => {
                    let i = 0
                    while (i < 3) {
                        if (this.fighterOne.Attacks[i] == this.fighterTwo.Attacks[i]) {
                            this.winnerOne += 0
                            this.winnerTwo += 0
                            this.rounds.push(0)
                        } else if (this.fighterTwo.Attacks[i] == 2) {
                            this.fighterOne.Attacks[i] == 0 ? (this.winnerOne += 1, this.rounds.push(1)) : (this.winnerTwo += 1, this.rounds.push(2))
                        } else if (this.fighterTwo.Attacks[i] == 0) {
                            this.fighterOne.Attacks[i] == 1 ? (this.winnerOne += 1, this.rounds.push(1)) : (this.winnerTwo += 1, this.rounds.push(2))
                        } else if (this.fighterTwo.Attacks[i] == 1) {
                            this.fighterOne.Attacks[i] == 2 ? (this.winnerOne += 1, this.rounds.push(1)) : (this.winnerTwo += 1, this.rounds.push(2))
                        }
                        i++
                    }
                    if (this.winnerOne > this.winnerTwo) {
                        this.message = "Winner is fighter One. Result is " + this.winnerOne + " - " + this.winnerTwo
                    } else if (this.winnerOne < this.winnerTwo) {
                        this.message = "Winner is fighter Two. Result is " + this.winnerOne + " - " + this.winnerTwo
                    } else {
                        this.message = "No winner. Result is " + this.winnerOne + " - " + this.winnerTwo
                    }
                    this.textButton = "AGAIN !!!"
                    this.endGame = true
                    setTimeout(() => {
                        this.$bvModal.show("modal-2")
                    }, 999)
                }, 5999)
            } catch (error) {
                console.error(error)
            }
        }
    },
    created() {
        if (!localStorage.getItem("id")) {
            this.fail = true
            this.startGame = false
        }
        setTimeout(() => {
            if (this.startGame) {
                this.fight()
            }
        }, 5999);
        // change waiting to fight for 4000ms
        // change fight to done for 4500ms
    }
}
</script>
<style>
.waiting_opponent {
    border: 2px solid black;
    background: white;
}

.error {
    background: #FF504D;
    color: white;
}

.error button {
    background: #FF504D;
    color: white;
    border: none;
}

.message {
    background: #73FFA0;
    color: white;
}

.message button {
    background: #73FFA0;
    color: white;
    border: none;
}

.content {
    background: #FFDF59;
    color: white;
}

.winner {
    border: 5px solid rgb(11, 250, 11);
}

.winner_text {
    color: rgb(11, 250, 11);
}

.drawn {
    border: 5px solid #FFDF59;
}

.notification {
    background: #73FFA0;
}

.logs {
    color: #ffcc00;
    font-weight: 700;

}

.round_winner {
    color: #ffcc00
}

.round_loser_or_drawn {
    color: #ffaf4d
}
</style>