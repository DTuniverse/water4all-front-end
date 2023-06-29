import "../pages/BlogArticlePage.css";
import React from "react";
import { Link } from 'react-router-dom';

export default function BlogArticlePage() {
    return(
        <div>
            <div>
                <img  
                className="articleHeroImage" 
                src={process.env.PUBLIC_URL + "/resources/articleImage.svg"} 
                alt="hands catching and holding water"/>
            </div>
            <div className="articleHeadlineContainer">
                <span className="articleHeadline">CLEAN DRINKING WATER:</span>
                <span className="articleHeadline">A VITAL LINK BETWEEN EDUCATION AND SOCIETY</span>
            </div>
            <div class="articleTextContainer">
                <p class="articleText">
                <span className="boldText">
                Clean drinking water is not just a fundamental human necessity; it is a critical component that 
                connects education and society. Access to clean water plays a pivotal role in shaping the well-being, 
                development, and success of individuals, communities, and nations. In this article, we will explore 
                the importance of clean drinking water in the context of education and its broader impact on society.
                </span>
                <span className="emptyLine" />
                Health and Well-being:<br />
                Clean drinking water is essential for maintaining good health and well-being. In schools, providing 
                clean water to students ensures their hydration and reduces the risk of waterborne diseases. 
                When children have access to clean water, they experience fewer health issues, leading to improved 
                attendance and better concentration in classrooms. Healthy students are more likely to actively 
                participate in learning, enhancing their educational outcomes.
                <span className="emptyLine" />
                Hygiene and Sanitation:<br />
                Clean water is a cornerstone of proper hygiene and sanitation practices. In educational institutions, 
                access to clean water enables students to maintain personal hygiene, such as handwashing, which 
                significantly reduces the spread of diseases. Additionally, clean water facilitates the maintenance 
                of clean and functional sanitation facilities, promoting dignity and privacy for students. 
                These factors contribute to a healthier and more conducive learning environment.
                <span className="emptyLine" />
                Nutritional Benefits:<br />
                Clean drinking water is crucial for promoting adequate nutrition among students. By providing clean 
                water in schools, children can safely prepare and consume nutritious meals. Water is also a key 
                component of a balanced diet, facilitating digestion, absorption of nutrients, and overall bodily 
                functions. Access to clean water empowers students to make healthier choices and fosters positive 
                habits that can extend beyond the school environment.
                <span className="emptyLine" />
                Academic Performance: <br />
                The availability of clean drinking water has a direct impact on academic performance. Dehydration 
                and water-related illnesses can impair cognitive functions, attention spans, and memory, hindering 
                students' ability to learn effectively. By ensuring access to clean water, educational institutions 
                create an environment that supports optimal brain function, enhancing students' focus, alertness, 
                and academic achievement.
                <span className="emptyLine" />
                Empowering Communities:<br />
                The importance of clean drinking water extends beyond the confines of educational institutions. 
                Access to clean water positively impacts entire communities, fostering economic growth, and societal 
                development. Communities with reliable access to clean water can pursue various activities such as 
                agriculture, entrepreneurship, and industry. This, in turn, leads to increased opportunities, 
                improved livelihoods, and a stronger social fabric.
                <span className="emptyLine" />
                Sustainable Development Goals:<br />
                Clean drinking water is closely tied to the United Nations Sustainable Development Goals (SDGs), 
                particularly Goal 6: Clean Water and Sanitation. By prioritizing access to clean water in educational 
                settings, societies contribute to achieving this global agenda and promoting a sustainable future. 
                Moreover, educating students about the importance of clean water instills a sense of environmental 
                responsibility, empowering them to become advocates for water conservation and protection.
                <span className="emptyLine" />
                <span className="boldText">
                Conclusion:<br />
                Clean drinking water is an indispensable resource that bridges the gap between education and society. 
                Its availability in schools ensures the well-being and development of students, fostering a conducive 
                learning environment. Moreover, access to clean water promotes healthier communities, empowers 
                individuals, and contributes to the broader goals of sustainable development. Recognizing the pivotal 
                role of clean drinking water in education and society is vital for creating a brighter and more 
                prosperous future for all.
                </span>
                </p>
            </div>
            <div className="backToHubButtonContainer">
                <Link to="/blogpage">
                    <button className="backToHubButton">BACK TO OVERVIEW</button>
                </Link>
            </div>
        </div>
    )
};