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
                <span className="articleHeadline">RAISING AWARENESS:</span>
                <span className="articleHeadline">A PATH TO SUSTAINABILITY</span>
            </div>
            <div class="articleTextContainer">
                <p class="articleText">
                <span className="boldText">
                Education and awareness play a pivotal role in promoting sustainable water management and ensuring 
                the responsible use of this precious resource. By educating individuals and raising awareness about 
                water-related topics, we can foster a culture of conservation, empower communities, and drive positive 
                change.<br /> In this article, we will explore the importance of educating and spreading awareness for 
                water-related topics and its significance in achieving long-term sustainability.
                </span>
                <span className="emptyLine" />
                <span className="italicText">Understanding the Water Cycle:</span><br />
                Education serves as the foundation for understanding the intricate dynamics of the water cycle. 
                <br />By learning about processes such as evaporation, condensation, and precipitation, individuals 
                gain insights into the interconnectivity of water sources and the importance of preserving them. 
                Understanding the water cycle promotes informed decision-making, encouraging responsible water 
                usage at both personal and societal levels.
                <span className="emptyLine" />
                <span className="italicText">Conservation and Efficient Water Use:</span><br />
                Educating individuals about the importance of water conservation instills a sense of responsibility 
                towards this valuable resource. <br /> Awareness campaigns and educational initiatives can highlight simple 
                yet impactful actions, such as reducing water waste, fixing leaks, and adopting water-efficient technologies. 
                <br />By promoting efficient water use, we can collectively reduce water stress, conserve energy, and 
                minimize the ecological footprint associated with water consumption.
                <span className="emptyLine" />
                <span className="italicText">Mitigating Water Pollution:</span><br />
                Water pollution poses a significant threat to ecosystems, human health, and the overall availability of clean water. 
                <br />By raising awareness about the causes and consequences of water pollution, educational efforts can inspire 
                individuals to adopt sustainable practices. <br />Promoting responsible waste disposal, advocating for proper 
                sewage treatment, and encouraging the use of eco-friendly products are crucial steps towards mitigating 
                water pollution and preserving water quality.
                <span className="emptyLine" />
                <span className="italicText">Valuing Water as a Finite Resource:</span><br />
                Education plays a vital role in shifting perspectives and fostering a deeper appreciation for the value of water 
                as a finite resource. <br />By highlighting the global water crisis and the challenges faced by water-scarce regions, 
                educational initiatives can cultivate a sense of urgency and empathy. Recognizing the significance of water 
                scarcity encourages individuals to make conscious choices that prioritize water conservation, both in their
                daily lives and on a larger scale.
                <span className="emptyLine" />
                <span className="italicText">Engaging Communities and Collaboration:</span><br />
                Education and awareness campaigns provide platforms for community engagement and collaboration. <br />By organizing 
                workshops, seminars, and community-driven projects, individuals can come together to address water-related 
                challenges in their localities.<br /> Collective efforts can yield innovative solutions, promote knowledge-sharing, 
                and create a network of individuals passionate about water conservation, fostering long-term sustainability.
                <span className="emptyLine" />
                <span className="italicText">Advocacy for Policy Change:</span><br />
                Education empowers individuals to become advocates for policy change and encourages them to engage with decision-makers. 
                <br />Informed and aware citizens can lobby for regulations and policies that prioritize water conservation, pollution 
                control, and equitable access to clean water.<br /> By raising their voices collectively, educated individuals can 
                influence governance structures and contribute to the development of robust water management strategies.
                <span className="emptyLine" />
                <span className="boldText">
                <span className="italicText">Conclusion:</span><br />
                Education and awareness are indispensable tools for achieving sustainable water management. <br />By educating individuals 
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