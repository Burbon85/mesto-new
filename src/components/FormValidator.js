export default class FormValidator {
  constructor (data, formElement){
  this._formSelector = data.formElement;
  this._inputSelector = data.inputSelector;
  this._submitButtonSelector = data.submitButtonSelector;
  this._inactiveButtonClass = data.inactiveButtonClass;
  this._inputError = data.inputError;
  this._activeError = data.activeError;
  this._formElement = formElement;

  this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));     
  this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  };

// // Функция isValid теперь принимает formElement и inputElement,
// // а не берёт их из внешней области видимости
// _isValid = (formElement, inputElement) => {
//   if (!inputElement.validity.valid) {
//     // showInputError теперь получает параметром форму, в которой
//     // находится проверяемое поле, и само это поле
//     this._showInputError(formElement, inputElement, inputElement.validationMessage);
//   } else {
//     // hideInputError теперь получает параметром форму, в которой
//     // находится проверяемое поле, и само это поле
//     this._hideInputError(formElement, inputElement);
//   }
// };

_showInputError = (inputElement, errorMessage) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = document.querySelector(`#${inputElement.id}-error`);
  // Остальной код такой же
  // inputElement.classList.add(this._inputError);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(this._activeError);
};

_hideInputError = (inputElement) => {
  // Находим элемент ошибки
  const errorElement = document.querySelector(`#${inputElement.id}-error`);
  // Остальной код такой же
  // inputElement.classList.remove(this._inputError);
  errorElement.classList.remove(this._activeError);
  errorElement.textContent = '';
};



_checkInputValidity = (inputElement) => {
  if (!inputElement.validity.valid) {
    this._showInputError(inputElement, inputElement.validationMessage);
  } else {
    this._hideInputError(inputElement);
  }
};

_hasInvalidInput = () => {
  // проходим по этому массиву методом some
  return this._inputList.some(inputElement => 
    !inputElement.validity.valid
  )
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

_toggleButtonState = () => {
  // Если есть хотя бы один невалидный инпут
  if (this._hasInvalidInput()) {
    // сделай кнопку неактивной
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  } else {
    // иначе сделай кнопку активной
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  }
};

_setEventListeners = () => {
  this._toggleButtonState();
    // Реализация  кода, отвечающего за сброс кнопки сохранения через setTimeout. 
    this._formElement.addEventListener('reset', () => {
      setTimeout(() => {this._toggleButtonState();}, 0);
    });
  // Обойдём все элементы полученной коллекции
  this._inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      this._checkInputValidity(inputElement);
      this._toggleButtonState();      
    });
  });
};
  
  // включение валидации вызовом enableValidation
  // все настройки передаются при вызове
enableValidation = () => {
  this._formElement.addEventListener('submit', function (evt) {
    evt.preventDefault()
  }); 
  this._setEventListeners();
};

}