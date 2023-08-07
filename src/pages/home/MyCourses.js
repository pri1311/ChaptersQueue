import React, { useState, useEffect } from "react";
import { app, db } from "../../features/firebase-config";
import CourseCard from "../../components/CourseCard";
import { useSelector } from "react-redux";
import { getDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/CourseCard.module.css";

function MyCourses() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const { uid, name } = useSelector((state) => state.user.value);
    useEffect(() => {
        if (uid === null || uid === "") {
            navigate("/login");
        }
        async function getChapters() {
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
            const data = docSnap.data();
            var courseList = [];
            Object.keys(data.courses).forEach((key) => {
                courseList.push(data.courses[key]);
            });
            setCourses(courseList);
        }
        getChapters();
    }, []);

    return (
        <div className={styles.grid}>
            {courses.length > 0 &&
                courses.map((course) => (
                    <CourseCard
                        course={course}
                        key={course.videoId}
                    ></CourseCard>
                ))}
        </div>
    );
}

export default MyCourses;
