import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Avatar from '../components/Avatar';
import AIAssistant from '../components/AIAssistant';
import { useAuth } from '../contexts/useAuth';
import * as api from '../services/api';

const CommunityDashboard = () => {
	const navigate = useNavigate();
	const { isAuthenticated } = useAuth();
	const [posts, setPosts] = useState([]);
	const [text, setText] = useState('');
	const [imageFile, setImageFile] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);
	const [publishing, setPublishing] = useState(false);
	const [loading, setLoading] = useState(true);
	const [success, setSuccess] = useState(false);
	const [errorMsg, setErrorMsg] = useState(null);
	const [showLoginModal, setShowLoginModal] = useState(false);
	const textareaRef = React.useRef(null);

	// Cargar posts desde el backend
	useEffect(() => {
		loadPosts();
	}, []);

	const loadPosts = async () => {
		try {
			setLoading(true);
			const data = await api.getPosts(50, 1);
			setPosts(data.publicaciones || []);
		} catch (error) {
			console.error('Error al cargar publicaciones:', error);
			setErrorMsg(error.message || 'No se pudieron cargar las publicaciones');
			setTimeout(() => setErrorMsg(null), 3000);
		} finally {
			setLoading(false);
		}
	};

	const canPublish = useMemo(() => text.trim().length > 0 || !!imagePreview, [text, imagePreview]);

	const onSelectImage = async (e) => {
		// Verificar autenticación antes de permitir seleccionar imagen
		if (!isAuthenticated) {
			setShowLoginModal(true);
			return;
		}
		
		const file = e.target.files?.[0];
		if (!file) return;
		try {
			setImageFile(file);
			// preview inmediata para UX
			const reader = new FileReader();
			reader.onload = () => setImagePreview(reader.result);
			reader.readAsDataURL(file);
		} catch (err) {
			console.error(err);
			setErrorMsg('La imagen no pudo subirse. Inténtalo de nuevo.');
			setTimeout(() => setErrorMsg(null), 3000);
		}
	};

	const onRemoveImage = () => {
		setImagePreview(null);
		setImageFile(null);
	};

	const publish = async () => {
		// Verificar autenticación antes de publicar
		if (!isAuthenticated) {
			setShowLoginModal(true);
			return;
		}
		
		if (!canPublish || publishing) return;
		setPublishing(true);
		try {
			let imageUrl = null;
			
			// Subir imagen al backend si existe
			if (imageFile) {
				const uploadResult = await api.uploadImage(imageFile);
				imageUrl = uploadResult.foto.fullUrl;
			}

			// Crear publicación en el backend
			const result = await api.createPost(
				text.trim(),
				imageUrl ? [imageUrl] : []
			);

			// Agregar la nueva publicación al feed
			setPosts((prev) => [result.publicacion, ...prev]);
			setText('');
			setImagePreview(null);
			setImageFile(null);
			setSuccess(true);
			setTimeout(() => setSuccess(false), 2200);
		} catch (error) {
			console.error('Error al publicar:', error);
			setErrorMsg(error.message || 'Error al publicar. Por favor intenta de nuevo.');
			setTimeout(() => setErrorMsg(null), 3000);
		} finally {
			setPublishing(false);
		}
	};

	const addComment = async (postId, content) => {
		// Verificar autenticación antes de comentar
		if (!isAuthenticated) {
			setShowLoginModal(true);
			return;
		}
		
		try {
			const result = await api.addComment(postId, content);
			// Actualizar el post local con el nuevo comentario
			setPosts((prev) => prev.map(p => p._id === postId
				? { ...p, comentarios: [...(p.comentarios || []), result.comentario] }
				: p
			));
		} catch (error) {
			console.error('Error al comentar:', error);
			setErrorMsg(error.message || 'Error al comentar');
			setTimeout(() => setErrorMsg(null), 3000);
		}
	};

		return (
			<div className="relative flex min-h-screen w-full flex-col bg-background-light text-text-light dark:bg-background-dark dark:text-text-dark font-display">
				<Header />
				<main className="w-full max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex-1">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
						{/* Feed Column */}
						<div className="lg:col-span-8 space-y-6">
							{/* Composer (antiguo modelado) */}
							<div className="bg-card-light dark:bg-card-dark p-4 rounded-xl shadow-sm border border-border-light dark:border-border-dark">
								<div className="flex items-start gap-4">
									<Avatar size="sm" />
									<div className="flex-1">
										<textarea
											ref={textareaRef}
											className="form-input w-full resize-none rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark placeholder:text-text-light/60 dark:placeholder:text-text-dark/60"
											placeholder="¿Qué historia quieres compartir sobre los productos de Amboró?"
											rows={3}
											value={text}
											onChange={(e)=>setText(e.target.value)}
										/>
										{imagePreview && (
											<div className="mt-3 relative">
												<img src={imagePreview} alt="Vista previa" className="max-h-72 w-full object-cover rounded-lg" />
												<button onClick={onRemoveImage} className="absolute top-2 right-2 rounded-full bg-primary text-white p-1 hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40" aria-label="Quitar imagen">
													<span className="material-symbols-outlined text-sm">close</span>
												</button>
											</div>
										)}
										<div className="flex items-center justify-between mt-3">
											<label className="flex items-center justify-center p-2 rounded-full hover:bg-primary/10 text-primary cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-primary/40">
												<span className="material-symbols-outlined text-2xl">add_photo_alternate</span>
												<input type="file" accept="image/*" className="hidden" onChange={onSelectImage} />
											</label>
											<button
												onClick={publish}
												disabled={!canPublish || publishing}
												className="min-w-[100px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-5 bg-primary text-white text-sm font-bold leading-normal tracking-wide hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
											>
												{publishing ? 'Publicando…' : 'Publicar'}
											</button>
										</div>
									</div>
								</div>
							</div>

							{/* Success Toast (antiguo modelado) */}
							{success && (
								<div className="flex items-center gap-4 bg-primary/10 dark:bg-primary/20 text-primary p-4 rounded-lg border border-primary/20">
									<span className="material-symbols-outlined">task_alt</span>
									<p className="text-sm font-medium">¡Tu historia fue compartida!</p>
								</div>
							)}

							{/* Feed */}
							<div className="flex flex-col gap-4">
								{loading ? (
									<div className="text-center py-16 px-6 bg-card-light dark:bg-card-dark rounded-xl">
										<div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
										<p className="mt-4 text-text-light/70 dark:text-text-dark/70">Cargando publicaciones...</p>
									</div>
								) : posts.length === 0 ? (
									<div className="text-center py-16 px-6 bg-card-light dark:bg-card-dark rounded-xl border-2 border-dashed border-border-light dark:border-border-dark">
										<img alt="Illustration of a person happily harvesting fruits from a tree" className="mx-auto h-40 w-auto mb-6 opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRYtdFerTqJR1eoJg308GMY-BfusHctN2EZXwMqdQayOKQxvF_jlYz4KrS4sMGzBmHVpxRG12r3tO1N4qTmR0asBUDSj1tfOxBDb39HqkWnSWGK1xxPpeGK5g_-nEy0oV3zKmzQCU4xHPVdv5hAgFMoGmep64QliETGXtMWT4QzS9G9X8rSLUKF45GPNpT-eFsiUgjLN5iM5YUrb5AeNG7o9Mk0YFqWSomAwXnP3A0HKynICwjFzz_0qckinikQFHg8nabUmmiyikQ" />
										<h3 className="text-xl font-bold text-text-light dark:text-text-dark">Aún no hay publicaciones</h3>
										<p className="mt-2 text-base text-text-light/80 dark:text-text-dark/80">¡Sé el primero en compartir tu historia sobre los productos de Amboró!</p>
										<button onClick={()=>{ textareaRef.current?.focus(); }} className="mt-6 min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-11 px-6 bg-accent text-white text-base font-bold leading-normal tracking-wide hover:opacity-90 transition-opacity">
											<span className="truncate">Crear publicación</span>
										</button>
									</div>
								) : (
									posts.map((post) => (
										<article key={post._id} className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden">
											<div className="p-4 sm:p-5">
												<div className="flex items-start gap-4">
													<Avatar size="md" />
													<div className="flex-1 min-w-0">
														<p className="text-text-light dark:text-text-dark text-base font-bold leading-tight">
															{post.usuario_id?.nombre || 'Usuario Anónimo'}
														</p>
														<p className="text-text-light/70 dark:text-text-dark/70 text-sm">{new Date(post.createdAt).toLocaleString()}</p>
													</div>
												</div>
												{post.texto_anecdota && (
													<p className="text-text-light dark:text-text-dark text-base leading-relaxed my-4 whitespace-pre-wrap">{post.texto_anecdota}</p>
												)}
											</div>
											{post.fotos && post.fotos.length > 0 && (
												<div className="w-full bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url('${post.fotos[0]}')` }}>
													<img src={post.fotos[0]} alt="Publicación" className="w-full object-cover" style={{ aspectRatio: '16 / 9' }} />
												</div>
											)}
											<div className="p-2 sm:p-3">
												<div className="flex items-center gap-2">
													<button className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 px-3 text-center text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 transition-colors">
														<span className="material-symbols-outlined text-xl">chat_bubble_outline</span>
														<span>Comentar</span>
													</button>
													<button className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 px-3 text-center text-sm font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40 transition-colors">
														<span className="material-symbols-outlined text-xl">share</span>
														<span>Compartir</span>
													</button>
												</div>
											</div>
											<CommentsSection post={post} onAdd={(content) => addComment(post._id, content)} />
										</article>
									))
								)}
							</div>
						</div>

				{/* Right Sidebar (antiguo modelado) */}
				<aside className="lg:col-span-4 space-y-6">
					{/* Asistente IA - Nuevo componente innovador */}
					<AIAssistant contexto="dashboard" />						<div className="bg-card-light dark:bg-card-dark p-5 rounded-xl shadow-sm border border-border-light dark:border-border-dark">
							<h3 className="text-lg font-bold mb-4 text-text-light dark:text-text-dark">Descubre Más</h3>
								<div className="space-y-4">
									<a className="group flex items-center gap-4 p-3 rounded-lg hover:bg-subtle-light dark:hover:bg-subtle-dark transition-colors" href="/recetas">
										<div className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg w-16 h-16 shrink-0" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCWnpjTn_H-xtocysmc9nMso6p6r3yWajSovKqaEbNQu6f_-rVdiSVgY7BTaHF-sUthG1dBFXFJb4EZhYlO8qF65bwA2NFjDSTm4jJbpjzHvBEDJ0eL8WDe8hnsjMDGXZqi1SoZC0YuyvZveESzAUyho0zaKgZVNw9R-EQuASieQilxsyAjy4s0a_5Q8vCvRFygYt3P4lbkYYifupVlXkcZszo5nnD2dljngNFxD0rBp5fZ-OGxJMEQSilSY-E3z9ZZe7uTJPsf66Tl')" }} />
										<div>
											<p className="font-bold text-primary group-hover:underline">Explorar Recetas</p>
											<p className="text-sm text-text-light/80 dark:text-text-dark/80">Nuevas ideas para tus platos.</p>
										</div>
									</a>
									<a className="group flex items-center gap-4 p-3 rounded-lg hover:bg-subtle-light dark:hover:bg-subtle-dark transition-colors" href="/tienda">
										<div className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg w-16 h-16 shrink-0" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDZb_qdwWdltpmRG6pnmrzC2BP2J4nKTzwz-tPX5E6CvpxwzMF-jAOp4lCgxgnioOmNYmdrFX4dcEzNqChs-h-ESS6x3nFbPSaYo-O6OaUomEi9cvDKATOAlqWpRsRjHVpWDRzuBZXlmLUSiC54Gqhj6C4WMcyhdLOw3Nbkj9LcGJYPg2rquZAqUU5102tTFzrOu1OokGKxW7SAMExl3ZWEcxYpemFaVWuUyNGVUGdoUC7bESAAujDodte6aarLv3ezRNznKsVrgqi_')" }} />
										<div>
											<p className="font-bold text-primary group-hover:underline">Tienda de Productores</p>
											<p className="text-sm text-text-light/80 dark:text-text-dark/80">Apoya a la comunidad local.</p>
										</div>
									</a>
								</div>
							</div>

							<div className="bg-secondary/50 dark:bg-subtle-dark p-6 rounded-xl text-center border border-secondary dark:border-border-dark">
								<img alt="Illustration of a person enjoying a cup of coffee outdoors" className="mx-auto h-32 w-auto mb-4" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsmCJOoZq0vfZRca2re7b0P7e-4y-ZpwI_bb6YI7ZLcS_kcIS5ipnkOtBTBNH2UsM2JL_yDyGC3IAbXb8QmkZbbkMjZzs1QXn787tjqTemnpA1jjwMKjWkhvKx2CWWw-gcYGFSPuAYue0HcibyTCHLEAwNbFomJ9gbzKHZjX2qsZQ_nAt_7-af-M8r9LxD9kswUs3QEtvb2duKomvx0BE9SfHs3MtUSLOZkiBLkyLI2f7D7Py_CEMrumbuxPtu2m-eLGbbFK2lt3fY" />
								<h4 className="text-lg font-bold text-primary">¡Bienvenido a la comunidad!</h4>
								<p className="mt-2 text-sm text-text-light/90 dark:text-text-dark/90">Comparte tus experiencias, descubre nuevas recetas y conecta con otros amantes de los productos de Amboró.</p>
							</div>

							{errorMsg && (
								<div className="flex items-center gap-4 bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400 p-4 rounded-lg border border-red-500/20">
									<span className="material-symbols-outlined">error_outline</span>
									<p className="text-sm font-medium">{errorMsg}</p>
								</div>
							)}
						</aside>
					</div>
				</main>
				<Footer />

				{/* Modal de Login Required */}
				{showLoginModal && (
					<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
						<div className="absolute inset-0 bg-black/50" onClick={() => setShowLoginModal(false)} />
						<div className="relative w-full max-w-md rounded-2xl bg-card-light dark:bg-card-dark p-6 shadow-xl border border-border-light dark:border-border-dark">
							<div className="flex flex-col items-center text-center">
								<div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
									<span className="material-symbols-outlined text-4xl text-primary">lock</span>
								</div>
								<h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-2">
									Necesitas tener una cuenta para esto
								</h3>
								<p className="text-text-light/70 dark:text-text-dark/70 mb-6">
									Regístrate o inicia sesión para publicar historias y comentar en la comunidad
								</p>
								<div className="flex items-center gap-3 w-full">
									<button
										onClick={() => setShowLoginModal(false)}
										className="flex-1 h-10 px-4 rounded-lg bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark text-text-light dark:text-text-dark text-sm font-medium hover:bg-subtle-light dark:hover:bg-subtle-dark transition-colors"
									>
										Cancelar
									</button>
									<button
										onClick={() => navigate('/login', { state: { from: '/' } })}
										className="flex-1 h-10 px-4 rounded-lg bg-primary text-white text-sm font-bold hover:brightness-110 transition-all"
									>
										Iniciar sesión
									</button>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		);
};

const CommentsSection = ({ post, onAdd }) => {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState('');
	const comments = post.comentarios || [];
	
	return (
		<div className="p-4 border-top border-t border-primary/10 dark:border-primary/20">
			<div className="flex items-center">
				<button onClick={() => setOpen(v => !v)} className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40">
					<span className="material-symbols-outlined text-base">comment</span>
					<span>{open ? 'Ocultar comentarios' : `Comentarios (${comments.length})`}</span>
				</button>
			</div>
			{open && (
				<div className="mt-3 flex flex-col gap-3">
					{comments.length === 0 ? (
						<p className="text-sm text-text-light/60 dark:text-text-dark/60">Sé el primero en comentar.</p>
					) : (
						comments.map(c => (
							<div key={c._id} className="text-sm">
								<span className="font-semibold">{c.usuario_id?.nombre || 'Usuario'}</span>
								<span className="text-text-light/60 dark:text-text-dark/60 text-xs"> • {new Date(c.createdAt).toLocaleString()}</span>
								<p className="mt-1">{c.contenido}</p>
							</div>
						))
					)}
					<div className="flex items-center gap-2">
						<input
							value={value}
							onChange={(e) => setValue(e.target.value)}
							placeholder="Escribe un comentario..."
							className="flex-1 rounded-lg bg-background-light dark:bg-background-dark/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
						/>
						<button
							onClick={() => { if (value.trim()) { onAdd(value); setValue(''); } }}
							className="h-9 px-4 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:opacity-60"
							disabled={!value.trim()}
						>
							Enviar
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default CommunityDashboard;
