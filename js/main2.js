
        const output = document.getElementById('output');
        let logCount = 0;

        // Fonction utilitaire pour logger
        function log(message, type = 'info') {
            logCount++;
            const timestamp = new Date().toLocaleTimeString();
            const logEntry = document.createElement('div');
            logEntry.className = `log-entry log-${type}`;
            
            if (type === 'pending') {
                logEntry.innerHTML = `<span class="spinner"></span><strong>[${timestamp}]</strong> ${message}`;
            } else {
                logEntry.innerHTML = `<strong>[${timestamp}]</strong> ${message}`;
            }
            
            output.appendChild(logEntry);
            output.scrollTop = output.scrollHeight;
        }

        // 1. Promise avec RESOLVE
        function testResolve() {
            log('🚀 Démarrage de la Promise avec RESOLVE', 'pending');
            
            const promiseResolve = new Promise((resolve, reject) => {
                log('⏳ Promise en cours d\'exécution...', 'info');
                
                setTimeout(() => {
                    const data = { 
                        message: 'Opération réussie!', 
                        id: Math.floor(Math.random() * 1000),
                        timestamp: Date.now()
                    };
                    resolve(data);
                }, 2000);
            });

            promiseResolve
                .then(result => {
                    log(`✅ RESOLVE: ${result.message} (ID: ${result.id})`, 'success');
                    return result;
                })
                .catch(error => {
                    log(`❌ Erreur: ${error}`, 'error');
                });
        }

        // 2. Promise avec REJECT
        function testReject() {
            log('🚀 Démarrage de la Promise avec REJECT', 'pending');
            
            const promiseReject = new Promise((resolve, reject) => {
                log('⏳ Promise en cours d\'exécution...', 'info');
                
                setTimeout(() => {
                    const error = new Error('Échec de l\'opération!');
                    reject(error);
                }, 2000);
            });

            promiseReject
                .then(result => {
                    log(`✅ RESOLVE: ${result}`, 'success');
                })
                .catch(error => {
                    log(`❌ REJECT capturé: ${error.message}`, 'error');
                });
        }

        // 3. Async/Await avec gestion d'erreur
        async function testAsyncAwait() {
            log('🚀 Démarrage de la fonction ASYNC/AWAIT', 'pending');
            
            // Simuler une API
            const fetchUserData = (userId) => {
                return new Promise((resolve, reject) => {
                    log(`📡 Récupération des données pour l'utilisateur ${userId}...`, 'info');
                    
                    setTimeout(() => {
                        const success = Math.random() > 0.3;
                        
                        if (success) {
                            resolve({
                                id: userId,
                                name: `Utilisateur ${userId}`,
                                email: `user${userId}@example.com`
                            });
                        } else {
                            reject(new Error('Utilisateur introuvable'));
                        }
                    }, 1500);
                });
            };

            try {
                const userId = Math.floor(Math.random() * 100);
                const userData = await fetchUserData(userId);
                log(`✅ Données reçues: ${userData.name} - ${userData.email}`, 'success');
            } catch (error) {
                log(`❌ Erreur async/await: ${error.message}`, 'error');
            }
        }

        // 4. Chaînage de Promises
        function testPromiseChain() {
            log('🚀 Démarrage du CHAÎNAGE de Promises', 'pending');

            const step1 = () => {
                return new Promise((resolve) => {
                    log('1️⃣ Étape 1: Initialisation...', 'info');
                    setTimeout(() => {
                        resolve('Données de l\'étape 1');
                    }, 1000);
                });
            };

            const step2 = (data) => {
                return new Promise((resolve) => {
                    log(`2️⃣ Étape 2: Traitement de "${data}"...`, 'info');
                    setTimeout(() => {
                        resolve(data + ' → Étape 2 complétée');
                    }, 1000);
                });
            };

            const step3 = (data) => {
                return new Promise((resolve, reject) => {
                    log(`3️⃣ Étape 3: Validation de "${data}"...`, 'info');
                    setTimeout(() => {
                        const success = Math.random() > 0.2;
                        if (success) {
                            resolve(data + ' → Étape 3 validée ✓');
                        } else {
                            reject(new Error('Échec de la validation à l\'étape 3'));
                        }
                    }, 1000);
                });
            };

            step1()
                .then(result1 => {
                    log(`✅ Étape 1 terminée`, 'success');
                    return step2(result1);
                })
                .then(result2 => {
                    log(`✅ Étape 2 terminée`, 'success');
                    return step3(result2);
                })
                .then(finalResult => {
                    log(`🎉 CHAÎNE COMPLÈTE: ${finalResult}`, 'success');
                })
                .catch(error => {
                    log(`❌ Erreur dans la chaîne: ${error.message}`, 'error');
                });
                
        }

        // Fonction pour effacer les logs
        function clearOutput() {
            output.innerHTML = '';w
            logCount = 0;
            log('🗑️ Logs effacés', 'info');
        }

        // Message de bienvenue
        log('👋 Bienvenue! Cliquez sur les boutons pour tester les Promises', 'info');