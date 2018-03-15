
export class RPEChart {


    chart = {
        1: {
            6.5: {
                value: 0.878
            },
            7: {
                value: 0.892
            },
            7.5: {
                value: 0.907
            },
            8: {
                value: 0.922
            },
            8.5: {
                value: 0.939
            },
            9: {
                value: 0.955
            },
            9.5: {
                value: 0.978
            },
            10: {
                value: 1.0
            }
        },
        2: {
            6.5: {
                value: 0.85
            },
            7: {
                value: 0.863
            },
            7.5: {
                value: 0.878
            },
            8: {
                value: 0.892
            },
            8.5: {
                value: 0.907
            },
            9: {
                value: 0.922
            },
            9.5: {
                value: 0.939
            },
            10: {
                value: 0.955
            }
        },
        3: {
            6.5: {
                value: 0.824
            },
            7: {
                value: 0.837
            },
            7.5: {
                value: 0.85
            },
            8: {
                value: 0.863
            },
            8.5: {
                value: 0.878
            },
            9: {
                value: 0.892
            },
            9.5: {
                value: 0.907
            },
            10: {
                value: 0.922
            }
        },
        4: {
            6.5: {
                value: 0.799
            },
            7: {
                value: 0.811
            },
            7.5: {
                value: 0.824
            },
            8: {
                value: 0.837
            },
            8.5: {
                value: 0.85
            },
            9: {
                value: 0.863
            },
            9.5: {
                value: 0.878
            },
            10: {
                value: 0.892
            }
        },
        5: {
            6.5: {
                value: 0.774
            },
            7: {
                value: 0.786
            },
            7.5: {
                value: 0.799
            },
            8: {
                value: 0.811
            },
            8.5: {
                value: 0.824
            },
            9: {
                value: 0.837
            },
            9.5: {
                value: 0.850
            },
            10: {
                value: 0.863
            }
        },
        6: {
            6.5: {
                value: 0.751
            },
            7: {
                value: 0.762
            },
            7.5: {
                value: 0.774
            },
            8: {
                value: 0.786
            },
            8.5: {
                value: 0.799
            },
            9: {
                value: 0.811
            },
            9.5: {
                value: 0.824
            },
            10: {
                value: 0.837
            }
        },
        7: {
            6.5: {
                value: 0.723
            },
            7: {
                value: 0.739
            },
            7.5: {
                value: 0.751
            },
            8: {
                value: 0.762
            },
            8.5: {
                value: 0.774
            },
            9: {
                value: 0.786
            },
            9.5: {
                value: 0.799
            },
            10: {
                value: 0.811
            }
        },
        8: {
            6.5: {
                value: 0.694
            },
            7: {
                value: 0.707
            },
            7.5: {
                value: 0.723
            },
            8: {
                value: 0.739
            },
            8.5: {
                value: 0.751
            },
            9: {
                value: 0.762
            },
            9.5: {
                value: 0.774
            },
            10: {
                value: 0.786
            }
        },
        9: {
            6.5: {
                value: 0.667
            },
            7: {
                value: 0.68
            },
            7.5: {
                value: 0.694
            },
            8: {
                value: 0.707
            },
            8.5: {
                value: 0.723
            },
            9: {
                value: 0.739
            },
            9.5: {
                value: 0.751
            },
            10: {
                value: 0.762
            }
        },
        10: {
            6.5: {
                value: 0.64
            },
            7: {
                value: 0.653
            },
            7.5: {
                value: 0.667
            },
            8: {
                value: 0.68
            },
            8.5: {
                value: 0.694
            },
            9: {
                value: 0.707
            },
            9.5: {
                value: 0.723
            },
            10: {
                value: 0.739
            }
        },
        11: {
            6.5: {
                value: 0.613
            },
            7: {
                value: 0.626
            },
            7.5: {
                value: 0.64
            },
            8: {
                value: 0.653
            },
            8.5: {
                value: 0.667
            },
            9: {
                value: 0.68
            },
            9.5: {
                value: 0.694
            },
            10: {
                value: 0.707
            }
        },
        12: {
            6.5: {
                value: 0.586
            },
            7: {
                value: 0.599
            },
            7.5: {
                value: 0.613
            },
            8: {
                value: 0.626
            },
            8.5: {
                value: 0.64
            },
            9: {
                value: 0.653
            },
            9.5: {
                value: 0.667
            },
            10: {
                value: 0.68
            }
        }
    }

    getPercentof1RM(reps:number, RPE:number): number {
        return this.chart[reps][RPE].value;
    }

    getNewWeight(completedWeight:number, completedReps:number, completedRPE:number, goalReps:number, goalRPE:number ) {
        let completedPercentof1RM = this.getPercentof1RM(completedReps, completedRPE);
        let goalPercentof1RM = this.getPercentof1RM(goalReps, goalRPE);
        let difference = completedPercentof1RM - goalPercentof1RM;
        return completedWeight * (1 - difference);
    }

}