import React from 'react';
import styles from './Shorts-subscribe.module.css';

const ShortsSubscribe = () => {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h3>Shorts</h3>
            </header>
            <main className={styles.main}>
                {shortsData.map((shorts, index) => (
                    <div className={styles.shortsContainer}>
                        <div className={styles.shorts}>
                            <img
                                src={shorts.thumbnail}
                                alt='잘 구운 쇼츠하나'
                            />
                            <p>조회수 {shorts.view}회</p>
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
};

export default ShortsSubscribe;


const shortsData = [{
    thumbnail: "https://i.ytimg.com/vi/ELqqGhM6Q88/oardefault.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&rs=AOn4CLA0y2husIrvzHjdSCivicyMwNnIyw",
    shortsId: "dkdkkdkdk1",
    title: "🔥SNS에서 난리난 게임기 모양 핸드크림?!",
    view: "282",
    } , {
    thumbnail: "https://i.ytimg.com/vi/ELqqGhM6Q88/oardefault.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&rs=AOn4CLA0y2husIrvzHjdSCivicyMwNnIyw",
    shortsId: "dkdkkdkdk1",
    title: "🔥SNS에서 난리난 게임기 모양 핸드크림?!",
    view: "282",
    } , {
    thumbnail: "https://i.ytimg.com/vi/ELqqGhM6Q88/oardefault.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&rs=AOn4CLA0y2husIrvzHjdSCivicyMwNnIyw",
    shortsId: "dkdkkdkdk1",
    title: "🔥SNS에서 난리난 게임기 모양 핸드크림?!",
    view: "282",
    } , {
    thumbnail: "https://i.ytimg.com/vi/ELqqGhM6Q88/oardefault.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&rs=AOn4CLA0y2husIrvzHjdSCivicyMwNnIyw",
    shortsId: "dkdkkdkdk1",
    title: "🔥SNS에서 난리난 게임기 모양 핸드크림?!",
    view: "282",
    } , {
    thumbnail: "https://i.ytimg.com/vi/ELqqGhM6Q88/oardefault.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&rs=AOn4CLA0y2husIrvzHjdSCivicyMwNnIyw",
    shortsId: "dkdkkdkdk1",
    title: "🔥SNS에서 난리난 게임기 모양 핸드크림?!",
    view: "282",
    } , {
    thumbnail: "https://i.ytimg.com/vi/ELqqGhM6Q88/oardefault.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&rs=AOn4CLA0y2husIrvzHjdSCivicyMwNnIyw",
    shortsId: "dkdkkdkdk1",
    title: "🔥SNS에서 난리난 게임기 모양 핸드크림?!",
    view: "282",
} , {
    thumbnail: "https://i.ytimg.com/vi/ELqqGhM6Q88/oardefault.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&rs=AOn4CLA0y2husIrvzHjdSCivicyMwNnIyw",
    shortsId: "dkdkkdkdk1",
    title: "🔥SNS에서 난리난 게임기 모양 핸드크림?!",
    view: "282",
    } , {
    thumbnail: "https://i.ytimg.com/vi/ELqqGhM6Q88/oardefault.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&rs=AOn4CLA0y2husIrvzHjdSCivicyMwNnIyw",
    shortsId: "dkdkkdkdk1",
    title: "🔥SNS에서 난리난 게임기 모양 핸드크림?!",
    view: "282",
    } , {
    thumbnail: "https://i.ytimg.com/vi/ELqqGhM6Q88/oardefault.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&rs=AOn4CLA0y2husIrvzHjdSCivicyMwNnIyw",
    shortsId: "dkdkkdkdk1",
    title: "🔥SNS에서 난리난 게임기 모양 핸드크림?!",
    view: "282",
    } , {
    thumbnail: "https://i.ytimg.com/vi/ELqqGhM6Q88/oardefault.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&rs=AOn4CLA0y2husIrvzHjdSCivicyMwNnIyw",
    shortsId: "dkdkkdkdk1",
    title: "🔥SNS에서 난리난 게임기 모양 핸드크림?!",
    view: "282",
    } , {
    thumbnail: "https://i.ytimg.com/vi/ELqqGhM6Q88/oardefault.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&rs=AOn4CLA0y2husIrvzHjdSCivicyMwNnIyw",
    shortsId: "dkdkkdkdk1",
    title: "🔥SNS에서 난리난 게임기 모양 핸드크림?!",
    view: "282",
} , {
    thumbnail: "https://i.ytimg.com/vi/ELqqGhM6Q88/oardefault.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&rs=AOn4CLA0y2husIrvzHjdSCivicyMwNnIyw",
    shortsId: "dkdkkdkdk1",
    title: "🔥SNS에서 난리난 게임기 모양 핸드크림?!",
    view: "282",
    } , {
    thumbnail: "https://i.ytimg.com/vi/ELqqGhM6Q88/oardefault.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&rs=AOn4CLA0y2husIrvzHjdSCivicyMwNnIyw",
    shortsId: "dkdkkdkdk1",
    title: "🔥SNS에서 난리난 게임기 모양 핸드크림?!",
    view: "282",
    } , {
    thumbnail: "https://i.ytimg.com/vi/ELqqGhM6Q88/oardefault.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&rs=AOn4CLA0y2husIrvzHjdSCivicyMwNnIyw",
    shortsId: "dkdkkdkdk1",
    title: "🔥SNS에서 난리난 게임기 모양 핸드크림?!",
    view: "282",
    } , {
    thumbnail: "https://i.ytimg.com/vi/ELqqGhM6Q88/oardefault.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&rs=AOn4CLA0y2husIrvzHjdSCivicyMwNnIyw",
    shortsId: "dkdkkdkdk1",
    title: "🔥SNS에서 난리난 게임기 모양 핸드크림?!",
    view: "282",
    } , {
    thumbnail: "https://i.ytimg.com/vi/ELqqGhM6Q88/oardefault.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&rs=AOn4CLA0y2husIrvzHjdSCivicyMwNnIyw",
    shortsId: "dkdkkdkdk1",
    title: "🔥SNS에서 난리난 게임기 모양 핸드크림?!",
    view: "282",
    }
]