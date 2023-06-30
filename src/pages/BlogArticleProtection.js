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
                <span className="articleHeadline">PROTECTING CLEAN DRINKING WATER:</span>
                <span className="articleHeadline">THE IMPERATIVE FOR RECOGNIZING IT AS A HUMAND RIGHT</span>
            </div>
            <div class="articleTextContainer">
                <p class="articleText">
                <span className="boldText">
                Clean drinking water is not just a basic necessity; it is a fundamental human right. Ensuring the 
                protection and availability of clean water for all individuals is essential for promoting health, 
                preserving ecosystems, and fostering societal well-being. In this article, we will explore why 
                safeguarding clean drinking water should be recognized as a human right and delve into the far-reaching 
                implications of this recognition.
                </span>
                <span className="emptyLine" />
                <span className="italicText">Safeguarding Health and Well-being:</span><br />
                Access to clean drinking water is crucial for safeguarding public health and well-being. Contaminated 
                water sources can lead to the spread of waterborne diseases, causing severe illness and even death. 
                By acknowledging clean water as a human right, governments and societies are compelled to prioritize 
                the protection and management of water sources, reducing the risks to public health and ensuring the 
                well-being of communities.
                <span className="emptyLine" />
                <span className="italicText">Environmental Conservation and Ecosystem Preservation:</span><br />
                Recognizing clean drinking water as a human right emphasizes the need for responsible and sustainable 
                management of water resources. Water is a finite and precious resource, intricately connected to 
                ecosystems and biodiversity. By protecting clean water sources, we can preserve delicate aquatic 
                ecosystems, maintain ecological balance, and mitigate the detrimental impact of pollution, overuse, 
                and climate change on our water bodies.
                <span className="emptyLine" />
                <span className="italicText">Addressing Inequality and Vulnerability:</span><br />
                Acknowledging clean water as a human right is essential for addressing inequality and vulnerability 
                in society. Marginalized communities, including those in poverty, remote areas, or conflict zones, 
                often face significant challenges in accessing clean water. By enshrining the right to clean drinking
                water, governments are compelled to implement policies and initiatives that ensure equitable access, 
                leaving no one behind and bridging social gaps.
                <span className="emptyLine" />
                <span className="italicText">Empowering Communities and Participation:</span><br />
                Recognizing clean drinking water as a human right empowers individuals and communities to actively 
                participate in decision-making processes regarding water management. It encourages community engagement, 
                promoting inclusive dialogue, and fostering partnerships between governments, civil society, and stakeholders. 
                Such participation allows for the development of sustainable water management strategies that meet the 
                specific needs and aspirations of communities.
                <span className="emptyLine" />
                <span className="italicText">Strengthening Sustainable Development:</span><br />
                The recognition of clean water as a human right aligns with the United Nations' Sustainable Development Goals (SDGs),
                particularly Goal 6: Clean Water and Sanitation. Protecting this right contributes to achieving not only SDG 6 but 
                also other interconnected goals, such as eradicating poverty, improving health and well-being, ensuring gender 
                equality, and fostering sustainable cities and communities. Water is a linchpin for sustainable development, and its 
                protection is essential for creating a prosperous and equitable future.
                <span className="emptyLine" />
                <span className="italicText">Future Generations and Intergenerational Equity:</span><br />
                Acknowledging clean drinking water as a human right acknowledges our responsibility towards future generations. 
                By protecting water sources today, we ensure their availability for future inhabitants of the planet. 
                This recognition promotes intergenerational equity, encouraging sustainable practices that conserve water 
                resources, minimize pollution, and maintain the integrity of ecosystems for the benefit of present and future 
                generations.
                <span className="emptyLine" />
                <span className="boldText">
                <span className="italicText">Conclusion:</span><br />
                Recognizing clean drinking water as a human right is not only a matter of basic necessity but also a vital step 
                towards building a just and sustainable world. Protecting this right upholds public health, preserves ecosystems, 
                addresses inequality, and empowers communities. By acknowledging clean water as a fundamental human right, we take 
                a significant stride towards ensuring the availability of this precious resource for all, leaving a lasting legacy 
                of well-being, equity, and environmental stewardship.
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