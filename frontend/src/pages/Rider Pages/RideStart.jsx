import { MapPin, Coins } from "lucide-react";
import Rings from "react-loading-icons/dist/esm/components/rings";
import { useLocation } from "react-router-dom";
import RiderLogoutButton from "../../components/Rider Components/RiderLogoutButton.jsx";
import LiveTracking from "../../components/LiveTracking.jsx";
import { SocketContext } from "../../context/SocketContext.jsx";
import { useContext, useEffect, useRef, useState } from "react";
import UPIAppsPaymentMode from "../../components/Rider Components/UPIAppsPaymentMode.jsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ToastContainer, Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RideStart = () => {
  const location = useLocation();
  const ride = location.state.ride;
  const { socket } = useContext(SocketContext);
  const [upiPaymentMethodPannelOpen, setUpiPaymentMethodPannelOpen] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentAllowed, setPaymentAllowed] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(false);
  const upiPaymentMethodPannel = useRef(null);
  const upiAppName = [
    {
      name: "Google Pay",
      uri: "tez://upi/pay",
      img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADgCAMAAADCMfHtAAAAkFBMVEX///9nOLhZHbNdJrTz8PliL7ZmNrhkM7dfKrVcI7RgK7VYG7NdJbTOxOZWFrJXF7Lv6/d7V8DCteDe1+7m4fL5+Pydhs/a0uzSyeji3PD18/q6q9zr5/XMweW2ptqEZMSvndfGuuJxSLxsQLqql9WJa8akjtKWfcySd8p/XMGNcMdrP7p1Tr2VfMusmdV5VL+o7rKtAAAMzklEQVR4nO2d2XajOBCGAxix2eDgDa/Bu+Ns7/92A+6kGwkkS+KXnczJfzFz0TnAZ4SqVKoqPVj/dz3c+wGM65fw5+uX8Ofrl/Dn65fw5+s2hMTz3NB3nG5Qqus4fhi6HrnJvQ0TEi90Ajvxnk+HfJ4us2xSKOut09VuvN/YUeCErmFQg4Re2I38p0M66T/wNBr2VsfXJHAMYhoi9Pwg2OdZh8tGabgeb5JuaIbSACEJA3s/n8rB/Xud2W4TOS7+cdCEJLSt3USR7kud9Bx10ZBQQuLaL/lQE+9TvVPkeMiHAhJ6gXNQHZuNWj/FwG8SRugmTz0E3kWd3A1QLxJDSHz7sIDxXdR7jDBfJIKQOO4Ki3fR9BQjGNsTki5JDfCV6h8BjG0JieOZ4ivVac/YkjAM5gb5Si32Ubs5pxWhFx9GhgELTTbdNrajBSEJnsHzJ09p0GKo6hO6/vI2fIVGp0j7NeoSkuh4M75SmRfeltB1s5sCFjpqvkY9Qvt8a75Cmd7aSofQS9Z3ACy+xqfgNoThlh+WMKxVrD5S1QmD0734Ck1DZfOvSkhi006MWKNH3yyhZ+tGKGA62iYJPetun+A/rWJzhOHrDdzQ6+opzTcqhP7+3myfmtoKiAqEzj0nUVoLX35KlScMxvfmqqjjSiNKE2oBzvqd/mI6mAymkvF9eURPFlGWUANw8OZEdqHLjlpkDcCIsm9RktDRWCvt/ep8QGKwJe34ctONHGGos5Z4pZ+AOGBTs5CbUaUI3WedJ3hkhpGLnounUqZfhtDbaD3AgV3OJeBP8SGTQZQgJOFM6/5D9v7kBUz4MJfwUSUIY939stxhruTkSLxSY/YWOoSJfkjtlZ3QE7RZfHi+Gtm4Sugc9G/fT5iLuU84tk9dzVm5RuhpTaNfStnAig2Psda+dkVC4rczYk/MICIhCOyf0iuzzRXCto7IiN1yCPH++1n8KYoJnV3b22cR+5tBtvopiT9FIaH32v72RyYar+k+iDQQfopCwhgRlbGYX9jBB+sOovibiNCB7M7XvMdIz0USaSsYpwJCxBgtxbo2Hj7cI/LBBYTa3hqrD8a1sXGJN18a8/fe+IRhC2eGVodZyBkwig/8JCouIXFxt18zRtmAUVxyt6W4hAHSvzoxRtmAUWTX21cJvQ/o/RmjbMAocv1THmGC/ZXZyQ5jiCi9cZw3DqGH3sZmTUYEXyl2OC+RQxjDM2WY78TDrxQPzRajmdDFp5LMGJOBN4oj1skXEUIcUkZL+gEMGMVd40tsJHTf4Hd/qK0y8EZxxAZN+ISJmXy1F3qc4o1iLULLIzTgGl+0oGc7vFHsN02nTYTGshHmtGuFN4rnBsemgZDgHY4v7elhBF8pDhqiUg2EjsG0Ztp7w38Om/oSo4HQRt+2IsZ7s9EZjmk9yl8ndI3u19N7KcRDX79u9euENn5lU9WRihr5rcOV7OVrBqNGSLbge7Ki91LQDvCkthKuEYYmyl8obapTOtwDr1Wj1ggj45lrI+ohAnA2bm2FwRKiQogi0SkGESqk90cDdpiyhOYHaaFJdcYjAdaFYocpS2hrfvmLwWQyHfblNKNcZBKdsuFisRhOi2tkk8GwM+sPBxPdNKoxM5syhMTSuuouuWQ+2bJiHsLrBl+5U5+XKf+XbLV+7awrJHS1wsBSWR/q8vRyN5hVIkPY1XKjGtdlAOlNQk/0AoMhjLU2tZsWLQjp/d4req+NJvQedS7J/mowOVpx9yltL2jC8F2L8NkUoV48jva+aUK9YcHfM2hLqLd3Qg8pmlBz0c1uEMII9Ty6nHLcKEJNa/jd3iFtESlC3Tjp3hBhoPfRdKhVNkXoazqlpuyhrgvpVF1TilDzN3voKZYiScrT3YamphqK0NZdGz7FgRMW8n2//jo91/ed4l+Kf3f/qPxLx3H8ero9uTTMKv7Yd7q2q7sNTa0RKcJI84rFqnaSrvJ8tZrPx+z6zH0+zNM0na/y3eFLu3yertP5gZ2iiDVepZc/nqeZfnyDirhVCQlk9cs4TeIwBeOydzFLRSpYUyUEJdPTLoV4Se0wm4qYneF+dV6oEmr6bKzo1YvY89oaIaQeoUroY8L5KoRMJjiKsJotWCXU9EpZ0aNUTPhshrBqLqqEASbaTRtHMeGTGcJq5kmVUNsc0lJ5h4YIqwaxShhhSq++AeGKQ5hgLq8y0+zNEKYVm0zNNJjLqxAaeofLilNTIUQVXn0DwuoKsUoI2r//Bt9h1W2rEKISLr8B4YBD2KrE6a9G38DiT78P4eMvoZ7MEs5UvLaP2xLqhfRZfQdCzkyDWeIzsbz7jFKOtQDlmSgRGppLMw4hJmtXidCQPew1e20gz1uJ0JDnveYQ6gcTq2IJhUHPsxnCOWdtgbm+EiFTBoIifOesDwNI7o4S4dgM4ZgTxdDdtqDF2sN7EO45kSjNDUlGrNd2D8INJ5oY5oirs4TCn80QIS/mDcoOZtb4dyCcVX/kKiHI9WYIhYF0M4RT3s4McSDXvz/hkre7Bqp/oAnFmyFmCHPuDmkAaeREzzS+sIWCGUKq7JjOVIBsPtH2UEx4NEK45WYqYCZTulOceIf0ZMIvHVE7yxQhJsnbUiA0sragU73prK8YcQO69kjsRhhZ48+pTAKaEDLV0Ov2UFgV45nY5aYXLDSheFqQFP1tCeve2bpWDCGdrU8TuogyfDoHjPiCP2VreCCEfXoyZ7KgEZV59Gdgicop2MoBCOGartBjCBFb+Rn9YgTeboctvoYQMjaWIUSUzHSYGsCA60fU8sMhhEznVoYQEvcmTF1Owhmnx1rBJ4KQSWSvVQXFAOeb/bqspGmKXjR0yEcQ5kzxGkuIiGRktSpHZzunM1lG2TluSCxGELINN1lCiL1wahXVxI+sU54ul8v1PB/vX5JuY+I0gLDPVgLXKiwTQFLNe1MLDuJd0mYdX3CKLIBwzo79GiFimHL6qFwXgLDWFbZGCCnMrfXXvRnhovbj1qvVY4RN2urVJ7QnrH8gdUJInexCryKxPWH9YOE6oW7hDK2eFmJrwrqhauqLgak8TqUQmV+8NWFD9U4DoYvpOLKUOCsltLAr4KYWPE0deEB9sKbulcPgvDif0JNuW8KmhmZNhHrlzg06NnlmXyLB65AtvG5L2FSd1NgJC5Qs/PAw+LA5jF5ASteiByWs+TNcQsw220WTfVw/9YaE0esf16kHHaWNZ9A3EpIAAfepzuoxDv76osQNnWj7/rWfDiVsaDDEI9QuRORolK3eHr0kihJ7c94tKxhQwmaHvpkQ+hJFQhI2v0Je70vglygUkpDTSpjXoRU2nYoFJFxx2pbzCM12/PorHOGIV6nL7ZSM79HaJBxhLfx1lRCUtnBFMEL+QR78juXQdtc8wQj5bR34hCY6p9eEIqwd9yJDaKJzek0gwpHggDLR6Q8x+oytukCEooNYRISYeIZQGMKlqKeD8IwS8+MUQjgKRNEE8Uk6iekT1CGE4iZOYkL4mYWsEIQr8XnkV857Mm33AYTXDu26dipZN4dTVQUgZPdjVQlbn9olVntC9twzdUISwM9pqGjZlvC9y3lueULLM9l2ty2hxObBdUIThxb+VUvCq0cDyhFajjnDz0aE1fIkZjJHAssQWkFuhq+W9qUYO3mR2aWUIrQSU43oF7RHqZb9+SHVRE2O0IrxB4n9EfUhqeUrPV3Z+FEjtGJDHupjcmmDdmmFFigt1/ZygNKExhCHab57f3/P83yudIe96MxDLUJjiHqSBlQgtOJbhKYkJfkNKhJascGjPdT0KA+oRGhFmIZubTXaqPTaVCK0AvxZXupaeErpSGqEln+TSLhQk0jCVdMntFzL+OkQYq0kklhaEVokMuXeSOkkDsogCAsnFXYEq7L6W4VJVJ/Qcj5MLvsFWkcaKY86hJaHP+ZeRietdsVahBaxMc1cVTTx9DpO6xEWc6p/4wlnrDqHtiUsXuMZf4I4V9m1LEADhMVrtPHnwDersxfsDxokLAtFjIaLv5QnbbratyIszP/eeMrG2pVeChogLIZqPDZqHLOtcHPwBoQl48HYlJO9tuVDEF7eoxF3fLkJAMdKIAhLxjM8q2FO2r+/UhjC0nRskDGO4TiSidjLCEVY7ohHR4zxGKWvEe5MEBxhITfwdq1LpZfnhszwFoISlqlitrXTf5Oz9TlxwIfWgAmtEjKwT6mGIzDIP2I0nmWCsJTn2O7bXH56nWX5cxSERo4cMkNolWUHfhC/jucTsakcTZf52Y26ZuhKGSO8qMS045f9OE97k2F/9rkBOuosppPlfPf27ESBEzYWgsBklvCPiOeGTrc8mzKKoiQp/lMeUikseQbqFoT31S/hz9cv4c/XL+HP1y/hz9f/n/A/aB/XQ+TZro8AAAAASUVORK5CYII=",
    },
    {
      name: "PhonePe",
      uri: "phonepe://upi/pay",
      img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABlVBMVEX///8eiOVDoEf7wC3mShn/wSwch+oAgeRBoEf8xS78wy4AgOQ0mzkdiOflPAD9wC3lQRhEoT3lQgAynkjlOgDmSBT0+v5EoTsAhevrRRYvnkjL4fj7vRY5nT6fy6EwmjXr9Pw1lpJFojXnURrtdiD4rirLtzX1oij7x0m52bvw9/BZql34/PnX6dhIo0xkr2d6uX2/3MCpzfPh7vs6lOjsf2Q/nlr64dvoWC5Yoer40skljMzykyWCqkDnvDCgrzxUo0XscB/98OwukqqAte7qYx0xlKE9nGT5tSvujXbvvi94qEGgx/Lou0XvmIP+8NL8z2j95bOLwo2CvYWbyZxkpuu/2vdXmkRlkkBwjD2VezO9ZynQWCFsiza2aSqHjUWhdjG6iFjk59mqcC7yqpo6mnkpj7/XVB6PfzUskLQnjcfAtTc3mIIzlZX1v7OpsDvqaUjoYjzzlSbtg2gji9Q5mXs8m25smbCHn6bIsmlilcG4rXbft1n71JtTkc3825H803imqIieppC0rH/TtVzHyKv+68Oflug2AAALx0lEQVR4nO2d+1cbxxXHkcRKA2ilRg+qwgqISRzASDZICRBqmyQk9YOYR2zwK3HaOEltp3ZcU6duG5s2KX93Z4UeK2lm996Zu96Vu99fcmL7HOlz7tz53vnuSBoaihQpUqRIkSJFihQpUqRIkSJFivR/rYVKZWlpfn5+qVKpLAT9ZqhVmd87W2Xl9Imm02VWPTu19KZgLsyfazBxxVticcZ5p6vXK4tBvz1d2XicLi4WK09X9ypBv0cdVfbiaSbDa0Gmz8wPaiErZ+XV64JMs6lBZKycm4bgtQo5cIwLe+kylO+kjmfmg37PKC1VQeuzm/Hs4Ow5i4gF6mSc/mJAHLJSRS1Qh8rlgdhW59EL1KH0maWg37+nrk+r88UHoR2/SGsBcpWn98LcjvqANiMLr3OcowAM81IlqeAJ4/S5MC7VKTLAuN2O10PHuJTWsIl+sXQ1ZO24QAsYD187VqkB4yFrxz3VUc1d5XJYzlUV8jXaFCtXQzHILZ7xCTAelnYkNYp+xuAHOfp9tEdlNhUs4Tl/thmHWLDnqoreiQnIOO1vO87UapOTtZlx4V+e9XmNNlVO+9WO4/uba7HU2NhYKla/sVzr+/t5X7cZh7hz+DHI1TZjKdM0Y7b4f1Pm2n73P1j0Y5rpJusofYZ6qc5sjjXp2jLH6l2M133dZjjVBKse3Lx1696tmwcHrEw8yC3HUrF+mWNrnbW64OM2w+niX96+c3f2d00N373z9ZdlwnMVL6AAsLFcN1ubjn9OwfL5e199z7mKw20V+f/O3rlH1Y5rogI2EVPmcuPfLPm1zbB89Wteu2GBOPMf/+QzYIOxPunfQMryB98UhXgnymSufawNuOkK2GC8UZvypwsZuz3swmcrV7yvCbg85gHYaMdP2Fs+8E3cvOvBZ7dk5umKDuBMr0mIEZOxt9+iZmQTt52biwtjQaeMNyCADcb1b39LCxi/413ApgrvKwNOejWhk/G7DwgZWRywQtvKrapuOHVgCRtKErYji3+PAOQrdVitGbfgJTwpI1U7YgE5YlEFcRy0zXQzrj8nWKqMYZZoq4oKC9XTCgVKJh9Utcs48RUakCOuogFrCoA2o/mDZhnzf1YA5NvNj1jCNewabcpMPtACZAdKgHyGu4YD3AdMM7IyPtQYU1n+LsjoBSp8iCKMKZawgbiu3ouKa9RWsYgBRDpFL+J3qojsYFYVkLciYp3CBlIXxL8oIua/US6hjQh3xU09QH7e+INaCTfem/2NBiF4QkUMpLIirp9SIZw4bYz+flidMQPdbFSdwqHStwrRTf68kUiMZN/xvYjL2iXk6/Qh3vgZu5BNcI28+5FqGQuwTtRxig4ivhPzF41EQ6Ojqu0I205VBtJ+JT/DbqdsI5FNJFqMau1YzAEAa0mKEsZMtO3nHxmJjkYuvaOCCNlroNGFF2H9A2wJnYCNdvwUz5i77Amo7xRNJZ/jCCcu9BDaSxWNWHzqSYiKLlwJf0At04ZT9GrkPXwRvXZTvYG0ixA1ubH4lWw/IV+pWMLMY3fAcRKnOCFEbab5J4IS2iv1XeRC9fILGqfAEzqdoneh4hCL7mONYnQhJnwbQcgHUjEgR8S5hkdgQzCQdggROw27KgXk+hS3TN1SN43oQkAIH9tYvs8pnK2IW6cFN0K6bcZ2/CqYsD2QStYpqohuwzedU8TsJAN8uJA4hWIRXQKpGcoSYjYamVN0hAlvXAh1o4sumTHwWMoHUtcSIrdTOSHZQNpQ8gF4kbo4hcoylfchpVNwQngJXZ3iRJcwq1RGuB9QCVvRhauyiEbMyNxCMyHtlhkDW4WHUzQbEe4XxVkJIeFAGsOcK+QDaRfhR3BCyTOoGm0JD6EV7IkuCAhzz8SERNFFU8m/wUsIAUQRii+fTFIOpHycOQUuodtA6iCE96EkiiKLLk4IwU4hjC5EAhNKHuhThNwOwE9IncLWJbBbiDcawugihjpUgJwigYoyMsI2JHYK8MgNcwquEXiqKDwdEjsFPOueADmFXUN4GwoXKa1TlJ6DSwgYSLGLtCDKEkmjC4RTuEcXXYsUfHgqzopKSLvNwI+FYKdIXNLbZ0ijC0RI6hVdKJVQdA2T2CkO4U7hGV00pWsVxCUEZ6Te0UWbEL6Rip47jZPOa4iH997RRQvwr/CNVDSS0s5rJXAIDHYKRM4mvohBGs4gogu4U8DHmYwooKlReiHGKYADKcophI/VSCdSRHQBdwrwzRqhUxA/qEBEF2CngAel4me/pCEweXRhS88paM0w+fAUuIRQpxjRdAriB6LwkBs8kCagfLKEjfJhkw/RBeaBjOTBL2Eb+hBd6GcXpAMNIrqIj0IHUnBIKr2dQPfA0Dz0IbqAO4XwZE+70SSfQ28Ew51iFJ4gyu6y0Z0rMNEF2CkQ+ZrsiSHZ4dc0fYguslA+lwuXM2T3LD8L0imKRekFGqqDhS8Dqb5TDNE9cMJEF1n66MLlHhsRobnuQ3SBcAqXi91EhH5EFwincPtgJQ1hGKOLNiHFXupPdAHl87gRTLKXIqIL5kPI7f4Rbgo/NA/BH+B6zU5hi2KmQUUXr9UpGoT6cykiunhtIbdT+o9G4TedEU4B5QN82lD7fBh0dOH5YUPdM74v0QXcKQBfMaD76QpEdMGAty4wIbfsEqJDmpupeQgeSGH38xI00YVTejFGyY/oQjfk7pFW5h10dAH6YLpOIwYdXUiukfZKw/NDG11QLVPMrQt4yA0uocdA6limyscLRHQRhzoFIuQW3n0SSvmbhAKOLiBOcSLVT1nAowv4NkMUXfRI8XyR/OlqHvZVSWwDfO4lii56pbjXfG48YhBGeDaDiS68v1XAKZXJLfl3K2uMXsx7/K4hxuv9cIqmIF9RKighd2fjgtdSZQwMSBdd9AvficmfrMa7yhqnN9wY8xvgJUoYXfQLH5uWXrTeuJF4kpcxsonzCTggTcgtEfZilFm32u8sa1w5L9xyWH7jNDR6StBGF/3COgbfZxzvjbdjHyPjfI/gBUQ5BeIbyzpC2n7p1+73zhmfbEzw1dpUfoKdP51AFJAu5JYKuU775syskb3y6OLVDV68+NXzTzgeio8u5JYLM56a/7AEbzJrOITC82sg7dYMohW725BCfjpFW4hPBpX+idhCINK/nwfSZAqKWPoXMaEB/sJSaHQhQQRX8XNaQuvnZxkYo9o3PjsQYTO4eQg9DsFkzA0Nffi0ACFED6S9qoEQzZfQm3cwWcf2az/O5LzXKPq7kPs0Xgf4ovnSoiQ0jpovfi3nwYjIZlwQN733G05ICJiw2j8Xs/J+wa0di7N6TdjSsuxHZXyqofXK8eKPVzPyJbpKA8ibse5RRtI+zI52/3TjfclSLWb0e7Aj8Y8fdQgp91Jrt+fFP74s2nL0f2ylWzPu3Vin80Njp//VV54Vcj31y1zW/8GcHk26LVWTjtDaFr36yrVcIZMrNpTLFGbvk/PZ2o9JGTsZhjbgkezlV+4/e7o6vLr64+XHVBtMn8a3ZP5f+jeVXVgB/+xm7YbYOVpJmz7gK+834bMm6yJGcx17whUrOxc0n61lUTuWaLaak4E0cI1v9h+qSr9QLFORUwSj/nYUBzVYiZ0iGPW5Y4lgqpE7RSDqGeSS/9EvohGS3xJvqXuQIzhe9A2kwau25mjH0gvNIhqhcIpe7XfaUbuIYdpmnNpqt6NmEUO2zTjUbkfzUKuIYdtmnGq1Y0lnOw3JNCNTsx2T6qNbCCZud41v2YOc+VJ1/rZCM67JZf9Od6yk+AjKmAtxE3Y0uZYy1QbwAQHkWq6nSr/iEa25gM/1CI1vpWJoRGtnUCrY0MyNFBJxEDaZbk3WXyCc37B+DvoNK2j5FzCiNRfSYdRDM/+F3QwyQu/zci3sWJ6MhrUzmAVsanvHcttxstaA89naPkrICmlYo68Gns/W4vGRZVnds2rW4H90dDxQFuiu7d2dKwmrrcTc0e4bUb1uLW5vH+/u7h4fb2+/QbWLFClSpEiRIkWKFClSpEiRIkWKpKr/ASXBMMJ8MBjNAAAAAElFTkSuQmCC",
    },
    {
      name: "Paytm",
      uri: "paytmmp://upi/pay",
      img: "data:image/png;base64,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",
    },
  ];

  // Enable payment if ride is completed
  useEffect(() => {
    if (ride && ride.status === "completed") {
      setPaymentAllowed(true);
    }
  }, [ride.status]);

  useEffect(() => {
    socket.on("ride-completed", (data) => {
      console.log("Ride completed", data);
      setPaymentAllowed(true);
    });
    return () => {
      socket.off("ride-completed");
    };
  }, []);

  useEffect(() => {
    if (paymentStatus) {
      toast.success("Payment done successfully", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }, [paymentStatus]);

  useGSAP(() => {
    if (upiPaymentMethodPannelOpen) {
      gsap.to(upiPaymentMethodPannel.current, {
        height: "100vh",
        duration: 0.5,
        ease: "power3.inOut",
      });
    } else {
      gsap.to(upiPaymentMethodPannel.current, {
        height: "0vh",
        duration: 0.5,
        ease: "power3.inOut",
      });
    }
  }, [upiPaymentMethodPannelOpen]);

  const handlePayButton = () => {
    setUpiPaymentMethodPannelOpen(true);
    setIsLoading(true);
  };

  return (
    <div className="relative h-screen w-screen">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <img
        className="w-14 ml-5 sm:ml-12 mb-5 absolute top-5 sm:top-8 z-[10]"
        src="https://brandeps.com/logo-download/U/Uber-logo-02.png"
        alt="Uber logo"
      />
      <RiderLogoutButton className="absolute top-0 right-0" />

      <LiveTracking />

      <div className="flex flex-col items-start gap-5 px-4 py-5 absolute bottom-0 h-[60vh] md:h-[50vh]  w-full bg-white shadow-lg shadow-gray-300 overflow-y-auto rounded-t-3xl">
        <div className="flex justify-between items-center w-full">
          <h3 className="text-lg sm:text-2xl font-bold">Ride has started...</h3>
          <Rings
            stroke="green"
            strokeOpacity={0.4}
            speed={0.7}
            className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10"
          />
        </div>

        <div className="w-full flex justify-center items-center py-4 rounded-2xl bg-gray-100 shadow-md">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/048/600/735/small/modern-car-isolated-on-background-3d-rendering-illustration-png.png"
            alt="Vehicle"
            className="object-cover object-center h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32"
          />
        </div>

        <div className="flex flex-col w-full gap-4">
          <div className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 rounded-2xl px-3 py-3 sm:py-4 md:py-5 active:border-2 active:border-black w-full text-left">
            <MapPin className="h-5 w-5 sm:h-6 sm:w-6" />
            <h3 className="text-xl sm:text-sm md:text-lg font-semibold">
              {ride ? ride.startLocation : "Pickup Location"}
            </h3>
          </div>
          <div className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 rounded-2xl px-3 py-3 sm:py-4 md:py-5 active:border-2 active:border-black w-full text-left">
            <MapPin className="h-5 w-5 sm:h-6 sm:w-6" />
            <h3 className="text-xl sm:text-sm md:text-lg font-semibold">
              {ride ? ride.endLocation : "Drop Location"}
            </h3>
          </div>
          <div className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 rounded-2xl px-3 py-3 sm:py-4 md:py-5 active:border-2 active:border-black w-full text-left">
            <Coins className="h-5 w-5 sm:h-6 sm:w-6" />
            <h3 className="text-xl sm:text-sm md:text-lg font-semibold">
              {ride ? ride.fare : "50"}
            </h3>
          </div>

          <button
            disabled={!paymentAllowed || isLoading}
            className={`${
              paymentAllowed
                ? "bg-green-400 hover:bg-green-500 pointer-events-auto"
                : "bg-gray-300 pointer-events-none"
            } px-3 py-3 sm:py-4 md:py-5 w-full rounded-full text-lg  md:text-2xl font-bold active:border-2 active:border-black transition-all duration-200`}
            onClick={handlePayButton}
          >
            {isLoading ? "Processing..." : "Pay"}
          </button>
        </div>
      </div>
      <div
        ref={upiPaymentMethodPannel}
        className="fixed h-0 bottom-0  w-screen bg-white z-[100]"
      >
        <UPIAppsPaymentMode
          isOpen={setUpiPaymentMethodPannelOpen}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          upiAppName={upiAppName}
          ride={ride}
          socket={socket}
          setPaymentStatus={setPaymentStatus}
        />
      </div>
    </div>
  );
};

export default RideStart;
