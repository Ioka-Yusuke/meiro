var map =[];
var eva_map =[];
var eva_x_list =[];
var eva_y_list =[];
var eva_result_map = [];
const MAP_VER = 27;                    //mapの縦の長さ
const MAP_SID = 27;                    //mapの横の長さ

//乱数 min<=num<max
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

//リスト表示
function drow_map(){
  for(var i=0;i<MAP_VER;i++){
    for(var j=0;j<MAP_SID;j++){
      document.write(map[i][j]);
    }
    document.write('<br>');
  }
}

//map壁等々
function base_map(){
  for(var i=0;i<MAP_VER;i++){
    map[i]=[];
    for(var j=0;j<MAP_SID;j++){
      if(i==1 && j==1){
        map[i][j] = 2;
      }else if(i==MAP_VER-2 && j==MAP_SID-2){
        map[i][j] = 3;
      }else if(i==0 || i==MAP_VER-1 || j==0 || j==MAP_SID-1){
        map[i].push(1);
      }else if(i%2==0 && j%2==0){
        map[i].push(1);
      }else{
        map[i].push(0);
      }
    }
  }
}

//map作成
function create_map(){
  for(i=0;i<MAP_VER;i++){
    for(j=0;j<MAP_SID;j++){
      if(i!=0 && i!=MAP_VER-1 && j!=0 && j!=MAP_SID-1){
        if(i%2==0 && j%2==0){
          n = getRandomInt(0, 4);
          if(n==0){
            map[i+1][j] = 1;
          }else if(n==1){
            map[i-1][j] = 1;
          }else if(n==2){
            map[i][j+1] = 1;
          }else if(n==3){
            map[i][j-1] = 1;
          }
        }
      }
    }
  }
}

//map描画
function block_map(){
  for(var i=0;i<MAP_VER;i++){
    for(var j=0;j<MAP_SID;j++){
      if(map[i][j]==1){
        document.write('■');
      }else if(map[i][j]==2){
        document.write('S&nbsp;');
      }else if(map[i][j]==3){
        document.write('G&nbsp;');
      }else{
        document.write('□');
      }
    }
    document.write('<br>');
  }
}

//評価map
function point_map(){
  for(i=0;i<MAP_VER;i++){
    eva_map[i] = [];
    for(j=0;j<MAP_SID;j++){
      eva_map[i][j] = -1;
    }
  }
}

//最短距離
function evaluation(){
  var eva_value = 1;
  eva_map[1][1] = 1;
  for(n=0;n<MAP_VER*MAP_SID;n++){
    for(i=0;i<MAP_VER;i++){
      for(j=0;j<MAP_VER;j++){
        if(eva_map[i][j]==eva_value){
          if(map[i+1][j]==0||map[i+1][j]==3){
            if(eva_map[i+1][j]==-1){
              eva_map[i+1][j] = eva_value + 1;
            }
          }
          if(map[i-1][j]==0||map[i-1][j]==3){
            if(eva_map[i-1][j]==-1){
              eva_map[i-1][j] = eva_value + 1;
            }
          }
          if(map[i][j+1]==0||map[i][j+1]==3){
            if(eva_map[i][j+1]==-1){
              eva_map[i][j+1] = eva_value + 1;
            }
          }
          if(map[i][j-1]==0||map[i][j-1]==3){
            if(eva_map[i][j-1]==-1){
              eva_map[i][j-1] = eva_value + 1;
            }
          }
        }
      }
    }
    eva_value += 1;
  }
}

//評価map表示
function drow_eva_map(){
  for(var i=0;i<MAP_VER;i++){
    for(var j=0;j<MAP_SID;j++){
      document.write(eva_map[i][j]);
    }
    document.write('<br>');
  }
}

//最短距離座標
function drow_paint(){
  goal_value=eva_map[MAP_VER-2][MAP_SID-2];
  x = MAP_VER-2;
  y = MAP_SID-2;
  eva_x_list =[MAP_VER-2];
  eva_y_list =[MAP_SID-2];
  for(l=0;l<MAP_VER*MAP_SID;l++){
    if(eva_map[x][y]==goal_value){
      if(eva_map[x+1][y]==goal_value-1){
        x = x + 1;
        eva_x_list.push(x);
        eva_y_list.push(y);
      }else if(eva_map[x-1][y]==goal_value-1){
        x = x - 1;
        eva_x_list.push(x);
        eva_y_list.push(y);
      }else if(eva_map[x][y+1]==goal_value-1){
        y = y + 1;
        eva_x_list.push(x);
        eva_y_list.push(y);
      }else if(eva_map[x][y-1]==goal_value-1){
        y = y - 1;
        eva_x_list.push(x);
        eva_y_list.push(y);
      }
    }
    goal_value -= 1;
  }
}

//最短距離map
function shortRoot(){
  for(i=0;i<MAP_VER;i++){
    eva_result_map[i] = [];
    for(j=0;j<MAP_VER;j++){
      eva_result_map[i][j] = '1';
    }
  }
  for(l=0;l<eva_x_list.length;l++){
    eva_result_map[eva_x_list[l]][eva_y_list[l]] = 0;
  }
}

//最短距離描画
function shortRoot_drow(){
  for(i=0;i<MAP_VER;i++){
    for(j=0;j<MAP_SID;j++){
      if(eva_result_map[i][j]==0){
        document.write('□');
      }else if(eva_result_map[i][j]==1){
        document.write('■');
      }
    }
    document.write('<br>');
  }
}

//迷路生成実行
base_map();
create_map();


//評価実行
point_map();
evaluation();
drow_paint();
document.write('<br>');
block_map();
document.write('<br>');
document.write('＊以下が答えの一つです');
document.write('<br>');
document.write('<hr width=1000 align=center>');
document.write('<br>');
document.write('<br>');
shortRoot();
shortRoot_drow();



