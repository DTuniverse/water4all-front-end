import "../pages/BlogArticlePage.css";
import React from "react";
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from "react";

export default function BlogArticleFuture() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0,0);
    }, [pathname]);
    return(
        <div>
            <div>
                <img  
                className="articleHeroImage" 
                src={process.env.PUBLIC_URL + "/resources/articleImage.svg"} 
                alt="hands catching and holding water"/>
            </div>
            <div className="articleHeadlineContainer">
                <span className="articleHeadline">THE SIGNIFICANCE OF CLEAN DRINKING WATER</span>
                {/* <span className="articleHeadline">A PATH TO SUSTAINABILITY</span> */}
            </div>
            <div class="articleTextContainer">
                <p class="articleText">
                <span className="boldText">
                Clean drinking water with good water quality is not just essential for our survival, it is a fundamental 
                requirement for maintaining optimal health and well-being. <br /> Access to safe and clean water is a basic 
                human right that underpins various aspects of life.<br /> In this article, we will explore the importance of 
                clean drinking water and its profound impact on our health, society, and overall quality of life.
                </span>
                <span className="emptyLine" />
                <span className="italicText">Vital for Human Health:</span><br />
                Clean drinking water is vital for maintaining good health.<br /> It serves as a medium for transporting essential 
                nutrients, regulating body temperature, and facilitating various bodily functions.<br /> Access to water free from 
                harmful contaminants reduces the risk of waterborne diseases, ensuring the well-being of individuals and 
                communities. Clean water supports healthy immune systems, reduces the prevalence of water-related illnesses, 
                and promotes overall longevity.
                <span className="emptyLine" />
                <span className="italicText">Hydration and Physical Performance:</span><br />
                Adequate hydration is crucial for optimal physical performance and cognitive function.<br /> Clean drinking water provides 
                the necessary hydration required for energy production, nutrient absorption, and organ function.<br /> It helps 
                regulate body temperature, prevents fatigue, and improves endurance during physical activities.<br /> Athletes, 
                in particular, rely on clean water to maintain peak performance levels, enhance recovery, and minimize the 
                risk of dehydration-related complications.
                <span className="emptyLine" />
                <span className="italicText">Promoting Economic Development:</span><br />
                Access to clean drinking water with good water quality is a catalyst for economic development. <br />Reliable water sources 
                enable agricultural activities, supporting food production and rural livelihoods. <br />Industries and businesses 
                depend on clean water for manufacturing processes, sanitation, and hygiene. Investments in water infrastructure 
                and treatment systems create employment opportunities, stimulate economic growth, and contribute to overall 
                prosperity.
                <span className="emptyLine" />
                <span className="italicText">Environmental Preservation:</span><br />
                Clean water plays a vital role in maintaining healthy ecosystems and preserving biodiversity.<br /> Bodies of water serve 
                as habitats for various species and are integral to the functioning of ecological systems. <br />By ensuring clean 
                water quality, we protect aquatic life, promote sustainable fisheries, and maintain the balance of ecosystems. 
                Preserving water quality also <br />safeguards the aesthetic value of natural landscapes, contributing to tourism, 
                recreation, and cultural heritage.
                <span className="emptyLine" />
                <span className="italicText">Education and Societal Development:</span><br />
                Access to clean drinking water is closely linked to educational opportunities and societal development. <br />Children who 
                have access to clean water are more likely to attend school regularly, concentrate better in <br />classrooms, and 
                achieve higher academic performance. Clean water availability in educational institutions promotes hygiene 
                practices, reduces illness-related absences, and creates a conducive learning environment.<br /> The ripple effect 
                of education, driven by access to clean water, fuels individual growth, social progress, and economic advancement.
                <span className="emptyLine" />
                <span className="italicText">Climate Resilience and Adaptation:</span><br />
                Clean drinking water with good water quality is crucial in building climate resilience and adaptation strategies. 
                <span className="emptyLine" />
                As climate change impacts weather patterns, water scarcity, and water availability, the need for clean water 
                becomes even more critical. <br />By ensuring sustainable water management practices, investing in water conservation, 
                and adapting to changing conditions, societies can better cope with the challenges posed by a changing climate.
                <span className="emptyLine" />
                <span className="boldText">
                <span className="italicText">Conclusion:</span><br />
                Education and awareness are indispensable tools for achieving sustainable water management.<br /> By educating individuals 
                and spreading awareness about water-related topics, we can foster a mindset of conservation, drive behavioral 
                change, and empower communities to become stewards of this vital resource. <br />Through collective efforts, informed 
                decision-making, and collaborative initiatives, we can pave the way for a future where responsible water use, 
                conservation, and equitable access to clean water are ingrained in our collective consciousness, ensuring a 
                sustainable and thriving planet for generations to come.
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