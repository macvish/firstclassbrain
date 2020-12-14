import dashboardIcon from '../assets/icons/dashboard.png'
import questionsIcon from '../assets/icons/questions.png'
import classroomIcon from '../assets/icons/classroom.png'
// import chatIcon from '../assets/icons/chat.png'
import accountIcon from '../assets/icons/account.png'

export const mainRoot = {
    root: {
        bottomTabs: {
            id: 'BottomTabs',
            children: [
                {
                    stack: {
                        id: 'DashboardStack',
                        children: [
                            {
                                component: {
                                    id: 'DashboardScreen',
                                    name: 'Dashboard'
                                    // name: 'Quiz'
                                }
                            }
                        ],
                        options: {
                            bottomTab: {
                                icon: dashboardIcon,
                                text: 'Dashboard'
                            }
                        }
                    }
                },
                {
                    stack: {
                        id: 'QuestionsStack',
                        children: [
                            {
                                component: {
                                    id: 'QuestionScreen',
                                    name: 'Questions'
                                }
                            }
                        ],
                        options: {
                            bottomTab: {
                                icon: questionsIcon,
                                text: 'Questions'
                            }
                        }
                    }
                },
                {
                    stack: {
                        id: 'ClassroomStack',
                        children: [
                            {
                                component: {
                                    id: 'ClassroomScreen',
                                    name: 'Classroom'
                                }
                            }
                        ],
                        options: {
                            bottomTab: {
                                icon: classroomIcon,
                                text: 'Classroom'
                            }
                        }
                    }
                },
                // {
                //     stack: {
                //         id: 'ChatStack',
                //         children: [
                //             {
                //                 component: {
                //                     id: 'ChatScreen',
                //                     name: 'Chat'
                //                 }
                //             }
                //         ],
                //         options: {
                //             bottomTab: {
                //                 icon: chatIcon,
                //                 text: 'Chat'
                //             }
                //         }
                //     }
                // },
                {
                    stack: {
                        id: 'AccountStack',
                        children: [
                            {
                                component: {
                                    id: 'AccountScreen',
                                    name: 'Account'
                                }
                            }
                        ],
                        options: {
                            bottomTab: {
                                icon: accountIcon,
                                text: 'Account',
                            }
                        }
                    }
                }
            ]
        }
    }
}