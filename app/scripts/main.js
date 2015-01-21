(function() {
    'use strict';
    var active_page = 1;
    var hasSeenCover = false;
    var $win = $(window);

    function action(item, state, callback) {
        var _this = $(item);
        _this.show();
        if (item !== '.main_menu') {
            $('.game .next').css({
                opacity: 1
            });
        }
        if (item === '.first') {
            if (state === 'in') {
                _this.children('.next').transition({
                    opacity: 1
                });
                _this = _this.find('.container');
                _this.children('.item_2').css({
                    opacity: 0,
                    scale: 0
                }).transition({
                    opacity: 1,
                    scale: 1
                }, 1000, 'easeOutSine');
                _this.children('.item_1').css({
                    opacity: 0,
                    y: -10
                }).transition({
                    opacity: 1,
                    y: 0,
                    delay: 300
                }, 1000, 'easeOutSine');
                _this.children('.item_3').css({
                    opacity: 0,
                    y: 10
                }).transition({
                    opacity: 1,
                    y: 0,
                    delay: 300
                }, 1000, 'easeOutSine');
                _this.children('.item_4').css({
                    opacity: 0,
                    x: -10
                }).transition({
                    opacity: 1,
                    x: 0,
                    delay: 1200
                }, 1000, 'easeOutSine');
                _this.children('.item_5').css({
                    opacity: 0,
                    x: 10
                }).transition({
                    opacity: 1,
                    x: 0,
                    delay: 1200
                }, 1000, 'easeOutSine');
                _this.children('.item_6').css({
                    opacity: 0
                }).transition({
                    opacity: 1,
                    delay: 2400
                }, 1000, 'easeOutSine');
            }
        } else if (item === '.main_menu') {
            $('.first .next').css({
                opacity: 0
            });
            if (state === 'in') {
                _this.show();
                _this.children('.item_1').css({
                    opacity: 0
                }).transition({
                    opacity: 1
                }, 1000);
                _this.children('.item_2').css({
                    opacity: 0
                }).transition({
                    opacity: 1
                }, 1000);
                _this.children('.item_3').css({
                    opacity: 0
                }).transition({
                    opacity: 1
                }, 1000, function() {
                    (callback && typeof(callback) === "function") && callback();
                    return;
                });
            } else if (state === 'out') {
                _this.children('.item_1').transition({
                    opacity: 0
                }, 1000);
                _this.children('.item_2').transition({
                    opacity: 0
                }, 1000);
                _this.children('.item_3').transition({
                    opacity: 0
                }, 1000, function() {
                    _this.hide();
                });
            }
        } else if (item === '.game_1 .section_2') {
            if (state === 'in') {
                _this.css({
                    opacity: 1
                });
                _this.children('.pic_1').css({
                    y: '-50%'
                }).transition({
                    y: '0',
                    opacity: 1
                }, 1000, 'easeOutQuint');
                _this.children('.pic_2').css({
                    y: '50%'
                }).transition({
                    y: '0',
                    opacity: 1
                }, 1000, 'easeOutQuint');
            }
            if (state === 'out') {
                _this.children('.pic_1').transition({
                    y: '-50%',
                    opacity: 0
                }, 1000, 'easeOutQuint');
                _this.children('.pic_2').transition({
                    y: '50%',
                    opacity: 0
                }, 1000, 'easeOutQuint', function() {
                    _this.css({
                        opacity: 0
                    });
                });
            }
        } else if (item === '.game_1 .section_3') {
            if (state === 'in') {
                _this.css({
                    opacity: 1
                });
                _this.children('.pic_2').css({
                    y: '10%',
                    opacity: 0
                })
                _this.children('.pic_1').css({
                    scale: 0.5
                }).transition({
                    scale: 1,
                    opacity: 1
                }, 1000, 'easeOutCubic', function() {
                    _this.children('.pic_2').transition({
                        y: '0',
                        opacity: 1
                    }, 1000, 'linear');
                });
            }
            if (state === 'out') {
                _this.css({
                    opacity: 1
                });
                _this.children('.pic_2').transition({
                    y: '10%',
                    opacity: 0
                }, 1000, 'easeOutCubic', function() {
                    _this.children('.pic_1').transition({
                        scale: 0.5,
                        opacity: 0
                    }, 1000, 'linear', function() {
                        _this.css({
                            opacity: 0
                        });
                    });
                });
            }
        } else if (item === '.game_1 .section_4') {
            if (state === 'in') {
                _this.css({
                    opacity: 1
                });
                _this.children('.pic_1').css({
                    scale: 0.5
                }).transition({
                    scale: 1,
                    opacity: 1
                }, 1000, 'easeOutCubic');
            }
            if (state === 'out') {
                _this.css({
                    opacity: 1
                });
                _this.children('.pic_1').transition({
                    scale: 0.5,
                    opacity: 0
                }, 1000, 'easeOutCubic', function() {
                    _this.css({
                        opacity: 0
                    });
                });
            }
        } else if (item === '.game_1 .section_5') {
            if (state === 'in') {
                _this.transition({
                    opacity: 1
                }, 1000);
                $('.next').css({
                    opacity: 0
                });
            }
        } else if (item === '.game_2 .section_2') {
            if (state === 'in') {
                _this.css({
                    opacity: 1
                });
                _this.children('.pic_1').css({
                    scale: 2
                }).transition({
                    scale: 1
                }, 1000, 'easeInCubic');
                _this.children('.pic_2').css({
                    scale: 2
                }).transition({
                    scale: 1,
                    delay: 200
                }, 1000, 'easeInCubic', function() {});
            }
        } else if (item === '.game_2 .section_3') {
            if (state === 'in') {
                _this.css({
                    opacity: 1
                });
                _this.children('.pic_1').css({
                    scale: 0.5
                }).transition({
                    scale: 1,
                    opacity: 1
                }, 1000, 'easeOutCubic');
            }
        } else if (item === '.game_2 .section_4') {
            if (state === 'in') {
                _this.css({
                    opacity: 1
                });
                _this.children('.pic_1').css({
                    y: '-50%'
                }).transition({
                    y: '0'
                }, 1000, 'easeOutQuint');
                _this.children('.pic_2').css({
                    y: '50%'
                }).transition({
                    y: '0'
                }, 1000, 'easeOutQuint');
            }
        } else if (item === '.game_2 .section_5') {
            if (state === 'in') {
                _this.css({
                    opacity: 1
                });
                _this.css({
                    '-webkit-mask-size': '1%'
                }).transition({
                    '-webkit-mask-size': "130%"
                }, 1000, 'easeInQuart');
            }
        } else if (item === '.game_2 .section_6') {
            if (state === 'in') {
                _this.transition({
                    opacity: 1
                }, 1000);
                $('.next').css({
                    opacity: 0
                });
            }
        } else if (item === '.game_3 .section_2') {
            if (state === 'in') {
                _this.css({
                    opacity: 1
                });
                _this.children('.pic_1').css({
                    y: '-10%'
                }).transition({
                    y: '0',
                    opacity: 1
                }, 500, 'linear');
                _this.children('.pic_2').css({
                    y: '10%'
                }).transition({
                    y: '0',
                    opacity: 1
                }, 500, 'linear');
            }
        } else if (item === '.game_3 .section_3') {
            if (state === 'in') {
                _this.css({
                    opacity: 1
                });
                _this.css({
                    '-webkit-mask-size': '1%'
                }).transition({
                    '-webkit-mask-size': "130%"
                }, 1000, 'easeInQuart');
            }
        } else if (item === '.game_3 .section_4') {
            if (state === 'in') {
                _this.css({
                    opacity: 1
                });
                _this.children('.pic_1').css({
                    x: "100%"
                }).transition({
                    x: 0,
                    opacity: 1
                }, 1000, 'easeOutCubic');
            }
        } else if (item === '.game_3 .section_5') {
            if (state === 'in') {
                _this.css({
                    opacity: 1
                });
                _this.children('.pic_1').css({
                    scale: 0
                }).transition({
                    scale: 1,
                    opacity: 1
                }, 1000, 'easeOutCubic');
            }
        } else if (item === '.game_3 .section_6') {
            if (state === 'in') {
                _this.transition({
                    opacity: 1
                }, 1000);
                $('.next').css({
                    opacity: 0
                });
            }
        }
        return;
    }

    function init(callback) {
        //伪代码
        if (1) {
            $('.section .install').html('打开').addClass('open').removeClass('install');
        } else {
            $('.section .install').html('安装');
        }
        (callback && typeof(callback) === "function") && callback();
    }

    function checkOrientation(argument) {
        function hideLandscapeWarn() {
            $('.main').children().not('.landscape').css({
                zIndex: 'initial'
            });
            $('.landscape').hide();
            if (!hasSeenCover) {
                init(function() {
                    action('.first', 'in');
                    hasSeenCover = true;
                });
            }
        }

        function showLandscapeWarn() {
            $('.main').children().not('.landscape').css({
                zIndex: -10
            });
            $('.landscape').show();
        }

        if ($win.height() > $win.width()) {
            showLandscapeWarn();
        } else {
            hideLandscapeWarn();
        }
        if (window.orientation === 0 || window.orientation === 180) {
            showLandscapeWarn();
        } else if (window.orientation === 90 || window.orientation === -90) {
            hideLandscapeWarn();
        }
    }

    jQuery(document).ready(function($) {
        checkOrientation();
        $(window).bind('orientationchange', function(e) {
            checkOrientation();
        });

        $('.link_game_1').click(function(event) {
            $('.game_1').show().css({
                opacity: 1
            })
            $('.game_1 .section_1').css({
                opacity: 1
            }).show()
            $('.game_1 .section_1 .line').css({
                opacity: 1
            })
            $('.next').css({
                opacity: 1
            });
            action('.main_menu', 'out');
            active_page = 2;
        });
        $('.link_game_2').click(function(event) {
            $('.game_2').show().css({
                opacity: 1
            })
            $('.game_2 .section_1').css({
                opacity: 1
            }).show()
            $('.game_2 .section_1 .line').css({
                opacity: 1
            })
            $('.next').css({
                opacity: 1
            });
            action('.main_menu', 'out');
            active_page = 2;
        });
        $('.link_game_3').click(function(event) {
            $('.game_3').show().css({
                opacity: 1
            })
            $('.game_3 .section_1').css({
                opacity: 1
            }).show()
            $('.game_3 .section_1 .line').css({
                opacity: 1
            })
            $('.next').css({
                opacity: 1
            });
            action('.main_menu', 'out');
            active_page = 2;
        });
        $('.first .next').click(function() {
            action('.main_menu', 'in', function() {
                $('.first .next').children().transition({
                    opacity: 0
                }, 1000, 'easeOutSine');
            });
        });
        $('.next').click(function(event) {
            var father = $(this).parent().attr("class").slice(5);
            if (!father) return;
            action('.' + father + ' .section_' + (active_page++), 'in');
        });
        $('.prev').click(function(event) {
            var father = $(this).parent().attr("class").slice(5);
            $('.' + father + ' .section_' + (--active_page)).hide()
            action('.' + father + ' .section_' + (active_page - 1), 'in');
        });
        $('.Back').click(function(event) {
            $('.item').css({
                opacity: 0
            });
            action('.main_menu', 'in');
            $('.game .section').hide()
            $('.game').hide();
        });
    });
})();