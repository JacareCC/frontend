"use client";

import { initFirebase } from "@/firebase/firebaseapp";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import CookieConsent from "@/components/popUpComponents/Cookies";
import TermsAndConditions from "@/components/landingPage/TermsAndConditions";
import "./globals.css";
import Image from "next/image";
import googleIcon from "../public/google.png";
import logoHome from "../public/logo-home-bgnashi.png";
import VerifyUser from "./globalfunctions/TokenVerification";
import LoadingAnimation from "@/components/loading/Loading";
import TeamCard from "@/components/landingPage/MyCard";
import LandingPageSlideshow from "@/components/landingPage/landingPageSlides/LandingPageSlideShow";
import PrivacyPolicy from "@/components/landingPage/PrivacyPolicy";

export default function Home() {
  const [uid, setUid] = useState<string | null | undefined>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [toggleAgreement, setToggleAgreement] = useState<boolean>(false);
  const [cookiesAccepted, setCookiesAccepted] = useState<boolean>(false);
  const [showConsent, setShowConsent] = useState<boolean>(true);
  const [showPrivacyPolicyContactUs, setShowPrivacyPolicyContactUs] =
    useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  initFirebase();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      setUid(user?.uid);
    }
  }, [loading]);

  useEffect(() => {
    if (uid && user) {
      VerifyUser(user.uid, setStatusCode);
    }
  }, [uid]);

  useEffect(() => {
    if (statusCode === 200 || statusCode === 201) {
      router.push("/search");
    }
    if (statusCode === 400) {
      router.push("/search");
    }
    if (statusCode === 401 && user) {
      handleUserRegistration(user.uid, user?.email);
    }
  }, [statusCode]);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem("cookiesAccepted");
    setCookiesAccepted(!!cookiesAccepted);
    setShowConsent(!cookiesAccepted);
  }, [showConsent]);

  async function handleUserRegistration(uid: string, email: string | null) {
    const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid: uid, email: user?.email }),
    })
      .then((response) => response.status)
      .then((status) => setStatusCode(status));
  }

  const handlerCookiesAccept = () => {
    setCookiesAccepted(true);
    setShowConsent(false);
  };

  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      // Handle successful sign-in
      setUid(result.user.uid);
    } catch (error: any) {
      if (error.code === "auth/cancelled-popup-request") {
        console.log("Popup request cancelled");
      } else {
        console.error("Error during sign-in:", error);
      }
    }
  };

  function handleToggleAgreement() {
    setToggleAgreement(true);
  }

  function handlePrivacyPolicyOnLandingClick() {
    setShowPrivacyPolicyContactUs(true);
  }

  const scrollToSection = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  statusCode !== 200 && statusCode !== 201;

  return (
    <>
      {cookiesAccepted ? null : (
        <div className="absolute inset-0 bg-black bg-opacity-0 z-3"></div>
      )}
      {statusCode !== 200 && statusCode !== 201 ? (
        <>
          <div className="">
            <main className="container mx-auto lg:px-8 max-w-screen-lg">
              <div className="flex w-auto justify-end my-2 shadow-lg shadow-indigo-500/40 rounded">
                <button
                  className="text-jgreen p-2 px-4 my-4 cursor-pointer font-semibold"
                  onClick={scrollToSection}
                >
                  About Us
                </button>
              </div>
              {!statusCode && user ? (
                <div className="flex justify-center items-center ">
                  <LoadingAnimation />
                </div>
              ) : (
                <>
                  <div className="flex flex-col items-center sm:flex-row gap-4 mx-2 mb-4 rounded p-1">
                    <div className="flex items-center shadow-lg shadow-indigo-500/40 rounded basis-1/2">
                      <Image
                        priority={true}
                        className=""
                        src={logoHome}
                        alt="logo"
                        width={500}
                        height={500}
                      />
                    </div>

                    <div className="flex flex-col justify-center items-center">
                      <div className="flex flex-col justify-center items-center sm:h-1/5">
                        <div className="flex flex-col object-fill sm:h-[10vh] items-center fixed top-1/2 space-y-2 ml-5 mr-5 p-10 max-w-full relative">
                          <button
                            onClick={signIn}
                            className="bg-emerald-100 text-indigo-500 p-2 rounded shadow-lg shadow-indigo-500/40 w-full sm:w-auto flex justify-center items-center"
                          >
                            <div className="flex items-center px-10">
                              <Image
                                priority={true}
                                src={googleIcon}
                                alt="Google Icon"
                                width={20}
                                height={20}
                              />
                              <span className="ml-2 text-base sm:text-lg lg:text-xl whitespace-nowrap">
                                Continue With Google
                              </span>
                            </div>
                          </button>
                        </div>
                        <h3 className="ml-4 mt-0 md:text-xs mt-4 justify-center items-center text-center font-semibold">
                          By Continuing you Agree to our Terms and Agreement. To
                          Read{" "}
                          <a
                            onClick={handleToggleAgreement}
                            className="text-blue-500 underline font-semibold"
                          >
                            Click here
                          </a>
                        </h3>
                      </div>
                      {toggleAgreement && (
                        <div className="fixed inset-0 flex items-center justify-center z-[101] bg-black bg-opacity-50">
                          <TermsAndConditions
                            setToggleAgreement={setToggleAgreement}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <LandingPageSlideshow />
                  </div>
                </>
              )}

              {showConsent && (
                <div className="absolute z-2 inset-0 flex items-center justify-center">
                  <CookieConsent onAccept={handlerCookiesAccept} />
                </div>
              )}
              <section
                ref={sectionRef}
                className="pt-8 md:pt-20 md:pb-32  bg-indigo-100 mt-8 md:mb-8 rounded shadow-lg shadow-indigo-500/40"
              >
                <div className="container mx-auto px-4">
                  <div className="flex flex-wrap justify-center text-center mb-8">
                    <div className="w-full lg:w-6/12 px-4">
                      <h2 className="text-4xl font-semibold">Our team</h2>
                      <p className="text-lg leading-relaxed m-4 text-gray-600"></p>
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-center">
                    <TeamCard
                      imgSrc={
                        "https://avatars.githubusercontent.com/u/55517364?s=400&u=e267aa5b3d8479ce7da963f204c85c07adb92dee&v=4"
                      }
                      name="Júlio Gonzalez"
                      role="Product Owner"
                      socialLinks={[
                        {
                          icon: "https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png",
                          color: "",
                          url: "https://www.linkedin.com/in/j%C3%BAlio-gonzalez-6000a6299/",
                        },
                        {
                          icon: "https://cdn1.iconfinder.com/data/icons/picons-social/57/github_rounded-512.png",
                          color: "",
                          url: "https://github.com/GONZALEZ-RODRIGUES",
                        },
                      ]}
                    />
                    <TeamCard
                      imgSrc={
                        "https://media.licdn.com/dms/image/D5603AQEPd0xEYC_hkA/profile-displayphoto-shrink_800_800/0/1700786087720?e=1707955200&v=beta&t=_qChzWPELyUj65pkCsdpxbnprHjWhQPPU4TI1AWkq4E"
                      }
                      name="Will Brammer"
                      role="Tech Lead"
                      socialLinks={[
                        {
                          icon: "https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png",
                          color: "",
                          url: "https://www.linkedin.com/in/william-brammer/",
                        },
                        {
                          icon: "https://cdn1.iconfinder.com/data/icons/picons-social/57/github_rounded-512.png",
                          color: "",
                          url: "https://github.com/NabbeunNabi",
                        },
                      ]}
                    />
                    <TeamCard
                      imgSrc={
                        "https://media.licdn.com/dms/image/D5635AQH6vqk-ieajCQ/profile-framedphoto-shrink_400_400/0/1702813389229?e=1703491200&v=beta&t=T1Y4uT5AzN9idavPst0ZoXlRbHWZ6b50sw12IqGu4j4"
                      }
                      name="Kai Hasuike"
                      role="Full Stack Engineer"
                      socialLinks={[
                        {
                          icon: "https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png",
                          color: "",
                          url: "https://www.linkedin.com/in/kai-eugene-5b1882162/",
                        },
                        {
                          icon: "https://cdn1.iconfinder.com/data/icons/picons-social/57/github_rounded-512.png",
                          color: "",
                          url: "https://github.com/kyougene",
                        },
                      ]}
                    />
                  </div>
                  <div className="flex flex-row justify-center items-center mt-12">
                    <p className="text-center mr-4 mb-4 font-semibold">
                      Contact us at:{" "}
                      <a
                        className="text-blue-500 underline font-semibold"
                        href="mailto:jacareview@gmail.com"
                      >
                        jacareview@gmail.com
                      </a>
                    </p>
                    <p className="text-center mb-4 mr-4 font-semibold">
                      Read our{" "}
                      <a
                        className="text-blue-500 underline font-semibold"
                        onClick={handlePrivacyPolicyOnLandingClick}
                      >
                        Privacy Policy
                      </a>
                    </p>
                  </div>
                </div>
              </section>
              <section></section>
            </main>
          </div>
          {showPrivacyPolicyContactUs && (
            <div className="fixed inset-0 flex items-center justify-center z-[101] bg-black bg-opacity-50">
              <PrivacyPolicy
                setShowPrivacyPolicy={setShowPrivacyPolicyContactUs}
              />
            </div>
          )}
        </>
      ) : (
        <LoadingAnimation />
      )}
    </>
  );
}
