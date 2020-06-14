雪碧图缺点,不能使用css控制,不能缩放

![image-20200614190704132](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200614190704132.png)

![image-20200614190752193](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200614190752193.png)



## 字体库

![image-20200614190809411](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200614190809411.png)



## each语法

```js
@each $key, $val in $theme-colors {
  .icon-#{$key} {
    color: $val;
  }
}
```

![image-20200614192702612](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200614192702612.png)

![image-20200614192748657](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200614192748657.png)



## 直接使用css做动画

```css
.submenu-item {
    position: relative;

    .submenu-title {
      display: flex;
      align-items: center;
    }

    .arrow-icon {
      transition: transform .25s ease-in-out;
      margin-left: 3px;
    }

    &:hover {
      .arrow-icon {
        transform: rotate(180deg);
      }
    }
  }
```



## 控制,垂直的情况下,不会显示css,点击的时候才显示

![image-20200614193905989](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200614193905989.png)

```css
同时有垂直和open,才有旋转
.is-vertical {
    .arrow-icon {
      transform: rotate(0deg) !important;
    }
  }

  .is-vertical.is-opened {
    .arrow-icon {
      transform: rotate(180deg) !important;
    }
  }
```

**本质上是根据open的状态来控制是否添加这个css属性**



## display设置成none的时候

其他的动画都会失效,比如透明度

![image-20200614212623060](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200614212623060.png)



![image-20200614212721541](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200614212721541.png)



![image-20200614213212358](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200614213212358.png)



顺序

![image-20200614213547844](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200614213547844.png)



顺序

![image-20200614213644819](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200614213644819.png)



## 方法,等动画exit之后,里面的元素会被卸载掉

![image-20200614213938549](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200614213938549.png)



## 动画效果封装成组件

![image-20200614220011848](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200614220011848.png)