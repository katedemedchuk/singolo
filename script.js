let navClickListener = (e) =>{
    Array.from(e.currentTarget.children).forEach( el => el.firstChild.classList.remove("active-red-color"))
    e.target.classList.add("active-red-color");
}

let phoneClickListener = e => {
    let elements = Array.from(e.currentTarget.children)
    if (elements[1].classList.contains('hide'))
        elements[1].classList.remove('hide')
    else
        elements[1].classList.add('hide')
}

let portfolioNavClickListner = e =>{
    Array.from(e.currentTarget.children[0].children).forEach( element => {
        element.classList.remove('portfolio-active') 
        element.firstChild.classList.remove('portfolio-active')
    })
    
    e.target.classList.add('portfolio-active')
    e.target.parentNode.classList.add('portfolio-active')

    let items = document.getElementsByClassName("portfolio-container")[0].children
    Array.from(items).forEach( e => {
        let rand = Math.floor( Math.random()*100 )
        e.style.order = rand        
    })
}

let portfolioClickListner = e =>{
    Array.from(e.currentTarget.children).forEach( el => el.classList.remove("portfolio-active-border"))
    e.target.classList.add("portfolio-active-border");
}

let formSubmitListener = e => {
    e.preventDefault()
    document.getElementById("form-submit-message").classList.remove('hide')

    let subject = String(document.getElementById("subject-input").value);
    let description = String(document.getElementById("description-input").value);

    subject === ''  ?
                    document.getElementById("subject-show").innerHTML = "no subject"
                    :
                    document.getElementById("subject-show").innerHTML = String().concat("Subject : ", subject)
    
    description === ''  ?
                            document.getElementById("description-show").innerHTML = "no description"
                        :
                            document.getElementById("description-show").innerHTML = String().concat("Description : ", description)                        
}

let okButtonListener = e => {
    document.getElementById("form-submit-message").classList.add('hide')    
    document.getElementById("submit-form").reset()
}

let ready = () => {

document.getElementById("header-naw-list").addEventListener("click", navClickListener);
document.getElementById("phone-v").addEventListener("click", phoneClickListener);
document.getElementById("phone-h").addEventListener("click", phoneClickListener);
document.getElementsByClassName("navContainer")[0].addEventListener("click", portfolioNavClickListner);

document.getElementsByClassName("portfolio-container")[0].addEventListener("click", portfolioClickListner);
document.getElementById("submit-form").addEventListener("submit", formSubmitListener);
document.getElementById("OK-button").addEventListener("click", okButtonListener);

var multiItemSlider = (function () {

    function _isElementVisible(element) {
      var rect = element.getBoundingClientRect(),
        vWidth = window.innerWidth || doc.documentElement.clientWidth,
        vHeight = window.innerHeight || doc.documentElement.clientHeight,
        elemFromPoint = function (x, y) { return document.elementFromPoint(x, y) };
      if (rect.right < 0 || rect.bottom < 0
        || rect.left > vWidth || rect.top > vHeight)
        return false;
      return (
        element.contains(elemFromPoint(rect.left, rect.top))
        || element.contains(elemFromPoint(rect.right, rect.top))
        || element.contains(elemFromPoint(rect.right, rect.bottom))
        || element.contains(elemFromPoint(rect.left, rect.bottom))
      );
    }

    return function (selector, config) {
      var
        _mainElement = document.querySelector(selector), // основный элемент блока
        _sliderWrapper = _mainElement.querySelector('.slider__wrapper'), // обертка для .slider-item
        _sliderItems = _mainElement.querySelectorAll('.slider__item'), // элементы (.slider-item)
        _sliderControls = _mainElement.querySelectorAll('.slider__control'), // элементы управления
        _sliderControlLeft = _mainElement.querySelector('.slider__control_left'), // кнопка "LEFT"
        _sliderControlRight = _mainElement.querySelector('.slider__control_right'), // кнопка "RIGHT"
        _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width), // ширина обёртки
        _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width), // ширина одного элемента    
        _positionLeftItem = 0, // позиция левого активного элемента
        _transform = 0, // значение транфсофрмации .slider_wrapper
        _step = _itemWidth / _wrapperWidth * 100, // величина шага (для трансформации)
        _items = [], // массив элементов
        _interval = 0,
        _html = _mainElement.innerHTML,
        _states = [
          { active: false, minWidth: 0, count: 1 },
          { active: false, minWidth: 980, count: 2 }
        ],
        _config = {
          isCycling: false, // автоматическая смена слайдов
          direction: 'right', // направление смены слайдов
          interval: 5000, // интервал между автоматической сменой слайдов
          pause: true // устанавливать ли паузу при поднесении курсора к слайдеру
        };

      for (var key in config) {
        if (key in _config) {
          _config[key] = config[key];
        }
      }

      // наполнение массива _items
      _sliderItems.forEach(function (item, index) {
        _items.push({ item: item, position: index, transform: 0 });
      });

      var _setActive = function () {
        var _index = 0;
        var width = parseFloat(document.body.clientWidth);
        _states.forEach(function (item, index, arr) {
          _states[index].active = false;
          if (width >= _states[index].minWidth)
            _index = index;
        });
        _states[_index].active = true;
      }

      var _getActive = function () {
        var _index;
        _states.forEach(function (item, index, arr) {
          if (_states[index].active) {
            _index = index;
          }
        });
        return _index;
      }

      var position = {
        getItemMin: function () {
          var indexItem = 0;
          _items.forEach(function (item, index) {
            if (item.position < _items[indexItem].position) {
              indexItem = index;
            }
          });
          return indexItem;
        },
        getItemMax: function () {
          var indexItem = 0;
          _items.forEach(function (item, index) {
            if (item.position > _items[indexItem].position) {
              indexItem = index;
            }
          });
          return indexItem;
        },
        getMin: function () {
          return _items[position.getItemMin()].position;
        },
        getMax: function () {
          return _items[position.getItemMax()].position;
        }
      }

      var _transformItem = function (direction) {
        var nextItem;
        if (!_isElementVisible(_mainElement)) {
          return;
        }
        if (direction === 'right') {
          _positionLeftItem++;
          if ((_positionLeftItem + _wrapperWidth / _itemWidth - 1) > position.getMax()) {
            nextItem = position.getItemMin();
            _items[nextItem].position = position.getMax() + 1;
            _items[nextItem].transform += _items.length * 100;
            _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
          }
          _transform -= _step;
        }
        if (direction === 'left') {
          _positionLeftItem--;
          if (_positionLeftItem < position.getMin()) {
            nextItem = position.getItemMax();
            _items[nextItem].position = position.getMin() - 1;
            _items[nextItem].transform -= _items.length * 100;
            _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
          }
          _transform += _step;
        }
        _sliderWrapper.style.transform = 'translateX(' + _transform + '%)';
      }

      var _cycle = function (direction) {
        if (!_config.isCycling) {
          return;
        }
        _interval = setInterval(function () {
          _transformItem(direction);
        }, _config.interval);
      }

      // обработчик события click для кнопок "назад" и "вперед"
      var _controlClick = function (e) {
        if (e.target.classList.contains('slider__control')) {
          e.preventDefault();
          var direction = e.target.classList.contains('slider__control_right') ? 'right' : 'left';
          _transformItem(direction);
          clearInterval(_interval);
          _cycle(_config.direction);
        }
      };

      // обработка события изменения видимости страницы
      var _handleVisibilityChange = function () {
        if (document.visibilityState === "hidden") {
          clearInterval(_interval);
        } else {
          clearInterval(_interval);
          _cycle(_config.direction);
        }
      }

      var _refresh = function () {
        clearInterval(_interval);
        _mainElement.innerHTML = _html;
        _sliderWrapper = _mainElement.querySelector('.slider__wrapper');
        _sliderItems = _mainElement.querySelectorAll('.slider__item');
        _sliderControls = _mainElement.querySelectorAll('.slider__control');
        _sliderControlLeft = _mainElement.querySelector('.slider__control_left');
        _sliderControlRight = _mainElement.querySelector('.slider__control_right');
        _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width);
        _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width);
        _positionLeftItem = 0;
        _transform = 0;
        _step = _itemWidth / _wrapperWidth * 100;
        _items = [];
        _sliderItems.forEach(function (item, index) {
          _items.push({ item: item, position: index, transform: 0 });
        });
      }

      var _setUpListeners = function () {
        _mainElement.addEventListener('click', _controlClick);
        if (_config.pause && _config.isCycling) {
          _mainElement.addEventListener('mouseenter', function () {
            clearInterval(_interval);
          });
          _mainElement.addEventListener('mouseleave', function () {
            clearInterval(_interval);
            _cycle(_config.direction);
          });
        }
        document.addEventListener('visibilitychange', _handleVisibilityChange, false);
        window.addEventListener('resize', function () {
          var
            _index = 0,
            width = parseFloat(document.body.clientWidth);
          _states.forEach(function (item, index, arr) {
            if (width >= _states[index].minWidth)
              _index = index;
          });
          if (_index !== _getActive()) {
            _setActive();
            _refresh();
          }
        });
      }

      // инициализация
      _setUpListeners();
      if (document.visibilityState === "visible") {
        _cycle(_config.direction);
      }
      _setActive();

      return {
        right: function () { // метод right
          _transformItem('right');
        },
        left: function () { // метод left
          _transformItem('left');
        },
        stop: function () { // метод stop
          _config.isCycling = false;
          clearInterval(_interval);
        },
        cycle: function () { // метод cycle 
          _config.isCycling = true;
          clearInterval(_interval);
          _cycle();
        }
      }

    }
  }());

  var slider = multiItemSlider('.slider', {
    isCycling: false
  })

}


document.addEventListener("DOMContentLoaded", ready);