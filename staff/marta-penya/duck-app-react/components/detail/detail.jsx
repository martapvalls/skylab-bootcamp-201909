function Detail({ duck: { title, imageUrl, price, description, link }}){



    return   <div className="view detail">
    <section className = "result view">
        <div className="detail-list">
            <h2 className="detail-list__title" >{title}</h2>
            <img className="detail-list__image" src={imageUrl}/>
            <p className="detail-list__description">{description}</p>
            <a href={link} className="detail-list__store">Go to Store</a>
            <p className="detail-list__price">{price}</p>
            <button className="detail-list__button">Back</button>
        </div>
    </section>
</div>
}