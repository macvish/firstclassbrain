import React from 'react'
import dashboardIcon from '../assets/dashboard.png'
import questionsIcon from '../assets/questions.png'
import classroomIcon from '../assets/classroom.png'
import chatIcon from '../assets/chat.png'
import accountIcon from '../assets/account.png'

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
                {
                    stack: {
                        id: 'ChatStack',
                        children: [
                            {
                                component: {
                                    id: 'ChatScreen',
                                    name: 'Chat'
                                }
                            }
                        ],
                        options: {
                            bottomTab: {
                                icon: chatIcon,
                                text: 'Chat'
                            }
                        }
                    }
                },
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