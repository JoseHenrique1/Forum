function Option({children, title, description}) {
    return ( 
        <div className="max-w-96 flex flex-wrap">
          {children}
          <p className="dark:text-gray-50">{title}</p>
          <p className="w-full text-gray-500 dark:text-gray-400">{description}</p>
        </div>
     );
}

export default Option;