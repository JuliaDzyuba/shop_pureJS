const PARAM = {
  cat: 'category',
  subcat: 'subcategory',
  search: ['name', 'description', 'category', 'subcategory']
}

export const getData = {
  url: 'database/dataBase.json',

  async getData(url) {
    const response = await fetch(url);
    if(!response.ok) {
      throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`);
    };
  
    return await response.json();
  },

  // get(process) {
  //   // console.log(this);
  //   fetch(this.url)
  //     .then( response => response.json())
  //     // .then( data => console.log(data))
  //     .then(process)
  // },

  get(process){
    this.getData(this.url)
        .then(process)
        .catch( (err) => console.log(err));
  },

  getWish(list, callback) {
    this.get( data => {
      const result = data.filter( item => list.includes(item.id));
      callback(result);
    })
  },

  getItem(value, callback){
    this.get( data => {
      const result = data.find( item => item.id === value);
      callback(result);
    })
  },

  getCart(list, callback) {
    this.get( data => {
      const result = data.filter( item => list.some(obj => obj.id === item.id));
      callback(result);
    })
  },

  getCategory(prop, value, callback){
    this.get( data => {
      const result = data.filter( item => item[PARAM[prop]].toLowerCase() === value.toLowerCase());
      callback(result);
    })
  },

  search(value, callback){
    this.get( data => {
     
      const result = data.filter( item => {
        
        for( let prop in item){
                              
          if( PARAM.search.includes(prop) && (item[prop].toLowerCase()).includes(value.toLowerCase())) {
            
            
            return true;
          }
        }
      });
      
      callback(result);
    })
  },

  getCatalog(callback){
    this.get( data => {
      const result = data.reduce( (arr,item) => {
        if(!arr.includes(item.category)){
          arr.push(item.category);
        }
        return arr;
      }, []) ;
      callback(result);
    })
  },

  getSubCatalog(value, callback){
    this.get( data => {

      const result = data.filter( item => item.category  === value)
        .reduce( (arr,item) => {
          if(!arr.includes(item.subcategory)){
            arr.push(item.subcategory);
          }
          return arr;
        }, []);
      callback(result);
    })
  }


};

getData.get();