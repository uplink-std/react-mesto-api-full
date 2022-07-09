import {useState, useEffect} from "react";
import {Header} from "./Header";
import {Main} from "./Main";
import {Footer} from "./Footer";
import {PopupWithForm} from "./PopupWithForm";
import {ImagePopup} from "./ImagePopup";
import {authApi} from "../utils/auth";
import {api} from "../utils/api";
import {CurrentUserContext, initialUser} from "../contexts/CurrentUserContext";
import {EditProfilePopup} from "./EditProfilePopup";
import {EditAvatarPopup} from "./EditAvatarPopup";
import {AddPlacePopup} from "./AddPlacePopup";
import {Route, Switch, useHistory, useRouteMatch} from "react-router-dom";
import {ProtectedRoute} from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import {routePaths} from "../utils/constants";
import {InfoTooltip} from "./InfoTooltip";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isViewPlacePopupOpen, setIsViewPlacePopupOpen] = useState(false);
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = useState(false);
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState(initialUser);
  const [cards, setCards] = useState([]);

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [tooltipSuccess, setTooltipSuccess] = useState(false);

  const history = useHistory();

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleViewPlaceClick = (card) => {
    setSelectedCard(card);
    setIsViewPlacePopupOpen(true);
  };

  const showTooltipPopup = () => {
    setIsTooltipPopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsViewPlacePopupOpen(false);
    setIsDeletePlacePopupOpen(false);
    setIsTooltipPopupOpen(false);
  }

  const handleTooltipClose = () => {
    closeAllPopups();
    if (tooltipSuccess) {
      handleLogin(registerEmail, registerPassword);
    }
    setRegisterEmail('');
    setRegisterPassword('');
  }

  const handleUpdateProfile = (newUserInfo) => {
    api.updateUserInfo(newUserInfo)
      .then((updatedUser) => {
        setCurrentUser({...updatedUser});
        closeAllPopups();
      })
      .catch(error => console.log(error));
  }

  const handleUpdateAvatar = (avatarUrl) => {
    api.updateUserAvatar(avatarUrl)
      .then((updatedUser) => {
        setCurrentUser({...updatedUser});
        closeAllPopups();
      })
      .catch(error => console.log(error));
  }

  const handleCardLike = (card, isLiked) => {
    api.setLike(isLiked, card._id)
      .then((card) => {
        const newCards = cards.map(originalCard => {
          if (card._id === originalCard._id) {
            return card;
          }
          return originalCard;
        });
        setCards(newCards);
      })
      .catch(error => console.log(error));
  };

  const handleCardDeleteClick = (card) => {
    setSelectedCard(card);
    setIsDeletePlacePopupOpen(true);
  }

  const handleDeletePlace = (e) => {
    e.preventDefault();
    api.deleteCard(selectedCard._id)
      .then(() => {
        const newCards = cards.filter(originalCard => (selectedCard._id !== originalCard._id));
        setCards(newCards);
        closeAllPopups();
      })
      .catch(error => console.log(error));
  };

  const handleAddPlace = (name, link) => {
    api.createCard({name, link})
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(error => console.log(error));
  };

  const updateCurrentUser = () => {
    let email = '';
    authApi.inspectToken()
      .then((userIdentity) => {
        email = userIdentity.email;
        return api.getUserInfo();
      })
      .then((user) => {
        setCurrentUser({email, ...user});
        if (atSignPage) {
          history.push('/');
        }
        return Promise.resolve();
      })
      .catch(error => {
        setCurrentUser(null);
        console.log(error)
      });
  }

  const handleRegister = (email, password) => {
    authApi.signup({email, password})
      .then((userInfo) => {
        setRegisterEmail(email);
        setRegisterPassword(password);
        setTooltipSuccess(true);
        return Promise.resolve(userInfo);
      })
      .catch((error) => {
        setTooltipSuccess(false);
        setRegisterEmail('');
        setRegisterPassword('');
        console.log(error)
      })
      .finally(showTooltipPopup);
  }

  const handleLogin = (email, password) => {
    authApi.signin({email, password})
      .then(() => updateCurrentUser())
      .catch((error) => {
        setTooltipSuccess(false);
        showTooltipPopup();
        console.log(error)
      });
  }

  const handleSignOut = () => {
    authApi.signout()
      .then(() => {
        setCurrentUser(null);
        history.push(routePaths.signIn);
        return Promise.resolve();
      })
      .catch((error) => console.log(error));
  }
  const atSignInPage = !!useRouteMatch('/sign-in');
  const atSignUpPage = !!useRouteMatch('/sign-up');

  const atSignPage = atSignInPage || atSignUpPage;

  const isLoggedIn = !!currentUser;

  useEffect(updateCurrentUser, []);

  useEffect(() => {
    if (isLoggedIn) {
      api.getCards()
        .then((cards) => {
          setCards(cards);
          return Promise.resolve(cards);
        })
        .catch(error => console.log(error));
    }
  }, [currentUser]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <Header onSignOut={handleSignOut} isLoggedIn={isLoggedIn} email={isLoggedIn ? currentUser.email : ""}/>
        <Switch>
          <Route path="/sign-in">
            <Login onSubmit={handleLogin}/>
          </Route>
          <Route path="/sign-up">
            <Register onSubmit={handleRegister}/>
          </Route>
          <ProtectedRoute isLoggedIn={isLoggedIn} path="/" component={Main} onEditProfile={handleEditProfileClick}
                          onAddPlace={handleAddPlaceClick}
                          onEditAvatar={handleEditAvatarClick} onCardClick={handleViewPlaceClick} cards={cards}
                          onCardLike={handleCardLike} onCardDelete={handleCardDeleteClick}/>
        </Switch>
        <Footer/>
      </div>

      {isLoggedIn &&
        <>
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onSubmit={handleUpdateProfile}/>

          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onSubmit={handleAddPlace}/>

          <ImagePopup name="view-card" isOpen={isViewPlacePopupOpen} onClose={closeAllPopups} image={selectedCard.link}
                      imageName={selectedCard.name}/>

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onSubmit={handleUpdateAvatar}/>

          <PopupWithForm name="delete-card" title="Вы&nbsp;уверены?" isOpen={isDeletePlacePopupOpen} saveCaption="Да"
                         onClose={closeAllPopups} onSubmit={handleDeletePlace}/>
        </>
      }

      <InfoTooltip name="tooltip" isOpen={isTooltipPopupOpen} onClose={handleTooltipClose} success={tooltipSuccess}/>
    </CurrentUserContext.Provider>
  );
}

export default App;
