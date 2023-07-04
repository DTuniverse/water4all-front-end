import "../pages/BlogPage.css";
import React from "react";
import { useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import Container from '@mui/material/Container';
import BlogPageQualityCard from '../components/BlogPageQualityCard';
import BlogPageProtectionCard from '../components/BlogPageProtectionCard';
import BlogPageEducationCard from "../components/BlogPageEducationCard";
import BlogPageFutureCard  from "../components/BlogPageFutureCard";

export default function BlogPage() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0,0);
    }, [pathname]);

    return(
        <div>
            <div className="blogHeadlineContainer">
                <span className="blogHeadline">WATER HUB</span>
            </div>
            <div className="blogHeroSpanContainer">
                <p className="blogHeroSpan">Discover the fascinating world of water and 
                explore its wonders on our insightful hub.
                Dive into captivating articles, tips for
                conservation, and the latest discoveries
                in water-related topics.</p>
            </div>
                <Container maxWidth="md" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="cardWrapper">
                        <Link to="/articlequality" className="linkWithoutUnderline">
                            <BlogPageQualityCard />
                        </Link>
                    </div>
                    <div className="cardWrapper">
                        <Link to="/articleeducation" className="linkWithoutUnderline">
                            <BlogPageEducationCard />
                        </Link>
                    </div>
                    <div className="cardWrapper">
                        <Link to="/articleprotection" className="linkWithoutUnderline">
                            <BlogPageProtectionCard />
                        </Link>
                    </div>
                    <div className="cardWrapper">
                        <Link to="/articlefuture" className="linkWithoutUnderline">
                            <BlogPageFutureCard />
                        </Link>
                    </div>
                </Container>
                <div className="blogButtonContainer">
                    <Link to="/blog" className="buttonLink">
                        <button className="yellowButton">VIEW ALL</button>
                    </Link>
                </div>
            </div>
    )
};