import React from 'react'
import style from "./Pagination.module.css"

export default function Pagination({ dogsPerPage, dogs, setCurrentPage, currentPage}) {
  const pages =[];

  for (let i = 1; i <= Math.ceil(dogs / dogsPerPage); i++) { 
    pages.push(i);
  }

  return(
    <nav className={style.pagination}>
      <button disabled={currentPage === 1 ? true : false} 
      className={style.btn } 
      onClick={() => setCurrentPage(currentPage -1) }>
        Previous
      </button>
        {pages?.map((pages, i) => {
          return(
            <button className={
              pages === currentPage ?
              style.btn_a : 
              style.btn
            }
              key={i} onClick={() => setCurrentPage(pages)}>
              {pages}
            </button> 
          )
        })}
      <button disabled={currentPage === Math.ceil(dogs / dogsPerPage) ? true : false} 
        className={style.btn} 
        onClick={() => setCurrentPage(currentPage +1)}>
          Next
      </button>
    </nav>
  )
}
